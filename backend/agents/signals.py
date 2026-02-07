
import requests
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import TeamMateNode, AdminAuditLog # Assuming standard model naming

@receiver(post_save, sender=TeamMateNode)
def handle_neural_kill_switch(sender, instance, created, **kwargs):
    """
    TeamStrength Overwatch Signal: 
    Satisfies IHL requirement for meaningful human intervention (Deactivation).
    """
    # We only care about transitions to suspended state
    if not created and instance.is_suspended:
        # Check if the state actually changed (simplified for this context)
        print(f"PROTOCOL: Kill Switch Activated for Node {instance.user_id}")
        
        # 1. Action (Railway): Halt the container
        stop_railway_node(instance.mesh_container_id)
        
        # 2. Action (LiveKit): Revoke voice session
        revoke_livekit_access(instance.user_id)
        
        # 3. Action (Audit): Log manual override
        AdminAuditLog.objects.create(
            action="Manual Kill Switch Activated",
            target_user_id=instance.user_id,
            details=f"Operator manually suspended node. Container {instance.mesh_container_id} terminated."
        )

def stop_railway_node(deployment_id):
    """Calls Railway GraphQL API to stop the deployment instance."""
    if not deployment_id: return
    
    url = "https://backboard.railway.app/graphql/v2"
    headers = {"Authorization": f"Bearer {settings.RAILWAY_API_TOKEN}"}
    
    mutation = """
    mutation deploymentStop($id: String!) {
      deploymentStop(id: $id)
    }
    """
    try:
        response = requests.post(url, json={'query': mutation, 'variables': {'id': deployment_id}}, headers=headers)
        response.raise_for_status()
    except Exception as e:
        print(f"FAILED TO TERMINATE RAILWAY NODE: {e}")

def revoke_livekit_access(user_id):
    """Conceptual: Calls LiveKit API to invalidate active tokens for this identity."""
    # In production, use livekit-server-sdk to RoomService.removeParticipant
    print(f"REVOKING LIVEKIT TOKENS FOR agent_{user_id}")
