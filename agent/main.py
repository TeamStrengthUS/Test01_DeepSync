import logging
import asyncio
import traceback
import json
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli
from livekit.rtc import DataPacket
from openai import AsyncOpenAI

logger = logging.getLogger("deepsync-agent")
logger.setLevel(logging.INFO)

async def entrypoint(ctx: JobContext):
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    logger.info(f"Brain connected to room: {ctx.room.name}")
    
    openai_client = AsyncOpenAI()
    
    @ctx.room.on("data_received")
    def on_data_received(packet: DataPacket):
        data = packet.data
        user_msg = data.decode('utf-8')
        logger.info(f"Heard user: {user_msg}")
        asyncio.create_task(respond(ctx, openai_client, user_msg))

async def respond(ctx, openai_client, user_msg):
    try:
        # Parse incoming JSON if needed
        try:
            msg_data = json.loads(user_msg)
            user_text = msg_data.get("message", user_msg)
        except:
            user_text = user_msg
        
        # Get AI response
        stream = await openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are DeepSync, an advanced tactical AI."},
                {"role": "user", "content": user_text}
            ],
            stream=True
        )
        
        full_response = ""
        async for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                full_response += chunk.choices[0].delta.content
        
        if full_response:
            logger.info(f"Replying: {full_response}")
            
            # BROADBAND BROADCAST: Send to ALL possible topics
            topics = ["chat", "lk.chat", "_chat"]
            payload = json.dumps({"message": full_response})
            
            for topic in topics:
                try:
                    await ctx.room.local_participant.publish_data(
                        payload=payload.encode('utf-8'),
                        reliable=True,
                        topic=topic
                    )
                    logger.info(f"Broadcast to topic: {topic}")
                except Exception as e:
                    logger.warning(f"Failed to broadcast to {topic}: {e}")
            
    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")
        logger.error(traceback.format_exc())

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
