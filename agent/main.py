import logging
import asyncio
import traceback
import json
import time
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
from livekit.plugins import openai
from livekit.rtc import DataPacket

# Configure logging
logger = logging.getLogger("deepsync-agent")
logger.setLevel(logging.INFO)

async def entrypoint(ctx: JobContext):
    # 1. Connect to the Room
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    logger.info(f"Brain connected to room: {ctx.room.name}")

    # 2. Set up the LLM
    chat_llm = openai.LLM(model="gpt-4o-mini")

    # 3. Define the hearing mechanism
    @ctx.room.on("data_received")
    def on_data_received(packet: DataPacket):
        # Decode the raw bytes
        raw_text = packet.data.decode('utf-8')
        
        # PARSE JSON: The frontend sends a JSON object, we need to extract the text
        try:
            data_json = json.loads(raw_text)
            # Try to find the 'message' field, otherwise fallback to raw text
            user_msg = data_json.get("message", raw_text)
        except json.JSONDecodeError:
            # If it wasn't JSON, just use the raw string
            user_msg = raw_text
            
        logger.info(f"Heard user: {user_msg}")

        # Create a task to think and reply
        asyncio.create_task(respond(ctx, chat_llm, user_msg))

async def respond(ctx: JobContext, chat_llm, user_msg):
    try:
        # Create the messages list explicitly
        # Note: Content must be a LIST of strings
        all_messages = [
            llm.ChatMessage(
                role="system", 
                content=["You are DeepSync, an advanced tactical AI. Keep responses concise, professional, and military-grade."]
            ),
            llm.ChatMessage(
                role="user", 
                content=[user_msg]
            )
        ]

        # Initialize Context
        chat_ctx = llm.ChatContext()
        
        # FORCE FIX: Overwrite the messages attribute to ensure our list is used.
        # This handles cases where .messages is a function returning a copy.
        try:
            if isinstance(chat_ctx.messages, list):
                chat_ctx.messages.extend(all_messages)
            else:
                # If it's a function or property, we force-overwrite it 
                # with a lambda that returns our list, or the list itself.
                # This ensures llm.chat() gets the data it needs.
                chat_ctx.messages = lambda: all_messages
        except Exception:
            # Ultimate fallback: just set it as a property
            chat_ctx.messages = all_messages

        # Generate response (Synchronous stream creation)
        stream = chat_llm.chat(chat_ctx=chat_ctx)
        
        full_response = ""
        # Iterate over the stream
        async for chunk in stream:
            if chunk.choices:
                for choice in chunk.choices:
                    if choice.delta and choice.delta.content:
                        full_response += choice.delta.content
        
        # Send the reply back to the room
        if full_response:
            logger.info(f"Replying: {full_response}")
            
            # FORMAT REPLY: Package the text into the JSON format the frontend expects
            response_payload = json.dumps({
                "message": full_response,
                "timestamp": int(time.time() * 1000)
            })
            
            # Send on 'lk.chat' topic so the frontend sees it
            await ctx.room.local_participant.publish_data(
                payload=response_payload.encode('utf-8'),
                topic="lk.chat",
                reliable=True
            )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")
        logger.error(traceback.format_exc())

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
