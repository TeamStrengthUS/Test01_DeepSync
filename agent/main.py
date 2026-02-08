async def respond(ctx: JobContext, chat_llm, user_msg):
    try:
        # Create a simple chat context
        chat_ctx = llm.ChatContext()
        
        # Add system message
        chat_ctx.append(
            role="system",
            text="You are DeepSync, an advanced tactical AI. Keep responses concise, professional, and military-grade."
        )
        
        # Add user message
        chat_ctx.append(
            role="user", 
            text=user_msg
        )
        
        stream = chat_llm.chat(chat_ctx=chat_ctx)
        
        full_response = ""
        async for chunk in stream:
            if chunk.choices:
                for choice in chunk.choices:
                    if choice.delta and choice.delta.content:
                        full_response += choice.delta.content
        
        if full_response:
            logger.info(f"Replying: {full_response}")
            await ctx.room.local_participant.publish_data(
                payload=full_response.encode('utf-8'),
                reliable=True
            )

    except Exception as e:
        logger.error(f"Brain Malfunction: {e}")
        logger.error(traceback.format_exc())
