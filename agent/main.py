import logging
import asyncio
import json
import time
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli
from livekit.rtc import DataPacket, Participant

# Configure logging
logger = logging.getLogger("deepsync-agent")
logger.setLevel(logging.INFO)

async def entrypoint(ctx: JobContext):
    # 1. Connect to the Room
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    logger.info(f"Brain connected to room: {ctx.room.name}")

    # 2. Define the hearing mechanism
    @ctx.room.on("data_received")
    def on_data_received(packet: DataPacket):
        # Decode the raw bytes
        raw_text = packet.data.decode('utf-8')
        
        # PARSE INPUT: The frontend likely sends JSON, so we peel that open
        try:
            data_json = json.loads(raw_text)
            user_msg = data_json.get("message", raw_text)
        except json.JSONDecodeError:
            user_msg = raw_text
            
        logger.info(f"Heard user: {user_msg}")

        # Create a task to reply
        asyncio.create_task(respond(ctx, user_msg))

async def respond(ctx: JobContext, user_msg):
    try:
        # --- THE ECHO TEST ---
        # No Brain yet. Just verifying the "mouth" works.
        response_text = f"DeepSync Visual Check. You said: {user_msg}"

        logger.info(f"Replying: {response_text}")
        
        # CRITICAL FIX: Send RAW TEXT only. No JSON.
        # This ensures standard chat components can render it immediately.
        await ctx.room.local_participant.publish_data(
            payload=response_text.encode('utf-8'),
            topic="lk.chat",
            reliable=True
        )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
