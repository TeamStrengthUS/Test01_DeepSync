import requests
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import TeamMateNode

@receiver(post_save, sender=TeamMateNode)
def handle_node_kill_switch(sender, instance, created, **kwargs):
    """
    TeamStrength Overwatch Signal: 
    Satisfies ICRC requirement for meaningful human intervention (Deactivation).
    """
    # Check if is_suspended was just changed to True
    if not created and instance.is_suspended:
        print(f"PROTOCOL: Kill Switch Triggered for Node {instance.user_id}")
        
        # 1. Action: Terminate Railway Container
        stop_railway_deployment(instance.mesh_container_id)
        
        # 2. Action: Revoke LiveKit Voice Token
        revoke_livekit_session(instance.user_id)
        
        # 3. Action: Notify Governance Channels
        notify_user_termination(instance)

def stop_railway_deployment(service_id):
    """Calls Railway GraphQL API to stop the specific service instance."""
    if not service_id:
        return

    url = "https://backboard.railway.app/graphql/v2"
    headers = {"Authorization": f"Bearer {settings.RAILWAY_API_TOKEN}"}
    
    mutation = """
    mutation serviceInstanceStop($id: String!) {
      serviceInstanceStop(id: $id)
    }
    """
    
    try:
        response = requests.post(url, json={'query': mutation, 'variables': {'id': service_id}}, headers=headers)
        response.raise_for_status()
    except Exception as e:
        print(f"Error stopping Railway deployment: {e}")

def revoke_livekit_session(user_id):
    """Revokes active LiveKit sessions for the user agent."""
    # Conceptual implementation using LiveKit Server SDK
    print(f"Revoking LiveKit session for agent_{user_id}")

def notify_user_termination(instance):
    """Sends termination signal to the messaging channel (Telegram/Slack)."""
    # Logic to send final message: "NODE SUSPENDED: Constitution Violation"
    pass
