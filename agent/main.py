import logging
import asyncio
import json
import time
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli
from livekit.rtc import DataPacket

# Configure logging
logger = logging.getLogger("deepsync-agent")
logger.setLevel(logging.INFO)

async def entrypoint(ctx: JobContext):
    # 1. Connect to the Room
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    logger.info(f"Brain connected to room: {ctx.room.name}")

    # 2. Define the hearing mechanism (The Ears)
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

        # Create a task to reply (The Mouth)
        asyncio.create_task(respond(ctx, user_msg))

async def respond(ctx: JobContext, user_msg):
    try:
        # --- THE BYPASS ---
        # We are NOT using the OpenAI LLM here. We are just echoing.
        # This proves the connection works without crashing on memory errors.
        
        response_text = f"DeepSync Copy. Received: {user_msg}. Systems nominal."

        logger.info(f"Replying: {response_text}")
        
        # FORMAT REPLY: Package the text into the JSON format the frontend expects
        response_payload = json.dumps({
            "message": response_text,
            "timestamp": int(time.time() * 1000)
        })
        
        # CRITICAL: Send on 'lk.chat' topic so the frontend sees it
        await ctx.room.local_participant.publish_data(
            payload=response_payload.encode('utf-8'),
            topic="lk.chat",
            reliable=True
        )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
