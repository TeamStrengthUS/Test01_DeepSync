import logging
import asyncio
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
from livekit.plugins import openai
# Import the packet structure
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

    # 3. Define the hearing mechanism (Fixed for latest LiveKit)
    @ctx.room.on("data_received")
    def on_data_received(packet: DataPacket):
        # EXTRACT data from the single packet object
        data = packet.data
        # participant = packet.participant (Available if needed)
        
        # Decode the raw signal into text
        user_msg = data.decode('utf-8')
        logger.info(f"Heard user: {user_msg}")

        # Create a task to think and reply
        asyncio.create_task(respond(ctx, chat_llm, user_msg))

async def respond(ctx: JobContext, chat_llm, user_msg):
    try:
        chat_ctx = llm.ChatContext().append(
            role="system",
            text="You are DeepSync, an advanced tactical AI. Keep responses concise, professional, and military-grade."
        ).append(
            role="user",
            text=user_msg
        )

        stream = await chat_llm.chat(chat_ctx=chat_ctx)
        
        full_response = ""
        async for chunk in stream:
            if chunk.choices and chunk.choices.delta.content:
                content = chunk.choices.delta.content
                full_response += content
        
        if full_response:
            logger.info(f"Replying: {full_response}")
            await ctx.room.local_participant.publish_data(
                payload=full_response.encode('utf-8'),
                reliable=True
            )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
