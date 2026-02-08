import logging
import asyncio
import json
import time
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli
from livekit.rtc import DataPacket

logger = logging.getLogger("deepsync-agent")
logger.setLevel(logging.INFO)

async def entrypoint(ctx: JobContext):
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    logger.info(f"Brain connected to room: {ctx.room.name}")

    @ctx.room.on("data_received")
    def on_data_received(packet: DataPacket):
        raw_text = packet.data.decode('utf-8')
        logger.info(f"Raw packet received: {raw_text}")
        
        # 1. Parse the Incoming JSON
        try:
            data_json = json.loads(raw_text)
            user_msg = data_json.get("message", raw_text)
        except json.JSONDecodeError:
            user_msg = raw_text
            
        logger.info(f"Heard user: {user_msg}")
        asyncio.create_task(respond(ctx, user_msg))

async def respond(ctx: JobContext, user_msg):
    try:
        response_text = f"DeepSync Visual Check. Received: {user_msg}"
        logger.info(f"Replying: {response_text}")
        
        # 2. Package Response as JSON (Matching Frontend dialect)
        response_payload = json.dumps({
            "message": response_text,
            "timestamp": int(time.time() * 1000)
        })
        
        # 3. Broadcast on the 'lk.chat' frequency
        await ctx.room.local_participant.publish_data(
            payload=response_payload.encode('utf-8'),
            topic="lk.chat",
            reliable=True
        )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
