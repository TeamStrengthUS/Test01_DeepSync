import logging
import asyncio
import traceback
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
        # Extract text from the packet
        data = packet.data
        user_msg = data.decode('utf-8')
        logger.info(f"Heard user: {user_msg}")

        # Create a task to think and reply
        asyncio.create_task(respond(ctx, chat_llm, user_msg))

async def respond(ctx: JobContext, chat_llm, user_msg):
    try:
        # Create the messages
        # Note: 'content' must be a LIST of strings
        sys_msg = llm.ChatMessage(
            role="system", 
            content="You are DeepSync, an advanced tactical AI. Keep responses concise, professional, and military-grade."
        )
        user_msg_obj = llm.ChatMessage(
            role="user", 
            content=user_msg
        )

        # Initialize Context
        chat_ctx = llm.ChatContext()
        
        # FIX 1: Robust Context Population
        # We check if 'messages' is a list (standard) or needs special handling
        if hasattr(chat_ctx, "messages") and isinstance(chat_ctx.messages, list):
            chat_ctx.messages.append(sys_msg)
            chat_ctx.messages.append(user_msg_obj)
        else:
            # Fallback: If the library version is behaving unexpectedly, we log it
            logger.warning(f"Warning: chat_ctx.messages is type {type(chat_ctx.messages)}")
            # Try appending anyway if it's not a list, it might be a custom collection
            chat_ctx.messages.append(sys_msg)
            chat_ctx.messages.append(user_msg_obj)

        # FIX 2: Do NOT await the chat method.
        # chat_llm.chat() returns the stream immediately.
        stream = chat_llm.chat(chat_ctx=chat_ctx)
        
        full_response = ""
        # FIX 3: Iterate over the stream
        async for chunk in stream:
            if chunk.choices:
                for choice in chunk.choices:
                    if choice.delta and choice.delta.content:
                        full_response += choice.delta.content
        
        # Send the reply back to the room
        if full_response:
            logger.info(f"Replying: {full_response}")
            await ctx.room.local_participant.publish_data(
                payload=full_response.encode('utf-8'),
                reliable=True
            )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")
        logger.error(traceback.format_exc())

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
