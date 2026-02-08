import logging
import asyncio
import json
import time
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli
from livekit.rtc import DataPacket

logger = logging.getLogger("deepsync-agent")
logger.setLevel(logging.INFO)

async def entrypoint(ctx: JobContext):
    # 1. Connect to the Room
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    logger.info(f"Brain connected to room: {ctx.room.name}")

    # 2. Define the hearing mechanism
    @ctx.room.on("data_received")
    def on_data_received(packet: DataPacket):
        raw_text = packet.data.decode('utf-8')
        
        # Parse the incoming JSON message
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
        # Construct the response text
        response_text = f"DeepSync Visual Check. Received: {user_msg}"
        logger.info(f"Replying: {response_text}")
        
        # Package as JSON (Required by most frontends)
        response_payload = json.dumps({
            "message": response_text,
            "timestamp": int(time.time() * 1000)
        })
        
        # BROADBAND BROADCAST: Send on ALL common topics.
        # One of these will match what your frontend is listening for.
        topics = ["chat", "lk.chat", "_chat"]
        
        for topic in topics:
            await ctx.room.local_participant.publish_data(
                payload=response_payload.encode('utf-8'),
                topic=topic,
                reliable=True
            )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
