
import os
import requests
import json
from letta import tool

# TEAMSTRENGTH NEURAL RELAY MODULE V1.0
# PROVIDES BIDIRECTIONAL COMMS VIA SUPABASE BUFFER

@tool
def check_web_messages(user_id: str):
    """
    Synchronizes the agent's internal state with the DeepSync Inbound Relay.
    Polls for unread 'inbound' messages from the human operator via the web HUD.
    
    Args:
        user_id (str): The unique identifier for the TeamStrength human operator.
        
    Returns:
        str: A JSON string containing a list of new messages, or a status message if empty.
    """
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    if not supabase_url or not supabase_key:
        return "ERROR: DeepSync credentials missing in node environment."

    # 1. Query for unread inbound transmissions
    query_url = f"{supabase_url}/rest/v1/web_chat_buffer"
    headers = {
        "apikey": supabase_key,
        "Authorization": f"Bearer {supabase_key}",
        "Content-Type": "application/json"
    }
    
    params = {
        "user_id": f"eq.{user_id}",
        "direction": "eq.inbound",
        "is_read": "eq.false",
        "select": "id,content,created_at"
    }

    try:
        response = requests.get(query_url, headers=headers, params=params)
        response.raise_for_status()
        messages = response.json()
        
        if not messages:
            return "HUD_SYNC: No new inbound transmissions detected."

        # 2. Mark messages as read (IHL Audit Requirement)
        for msg in messages:
            update_url = f"{query_url}?id=eq.{msg['id']}"
            requests.patch(update_url, headers=headers, data=json.dumps({"is_read": True}))

        return json.dumps({
            "status": "INGRESS_SUCCESS",
            "count": len(messages),
            "payload": messages
        })

    except Exception as e:
        return f"CRITICAL_FAILURE: Neural Mesh sync error: {str(e)}"

@tool
def send_web_reply(user_id: str, content: str):
    """
    Transmits a neural response back to the TeamStrength Web HUD via the Outbound Relay.
    
    Args:
        user_id (str): The destination human operator ID.
        content (str): The text message or analytics summary to transmit.
        
    Returns:
        str: Transmission confirmation status.
    """
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    if not supabase_url or not supabase_key:
        return "ERROR: DeepSync credentials missing."

    payload = {
        "user_id": user_id,
        "direction": "outbound",
        "content": content,
        "is_read": False
    }

    headers = {
        "apikey": supabase_key,
        "Authorization": f"Bearer {supabase_key}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }

    try:
        url = f"{supabase_url}/rest/v1/web_chat_buffer"
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        
        return "EGRESS_SUCCESS: Transmission buffered to DeepSync Vault."
    except Exception as e:
        return f"EGRESS_FAILURE: Mesh relay blocked: {str(e)}"
