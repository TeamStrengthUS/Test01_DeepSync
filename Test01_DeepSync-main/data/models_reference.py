
from django.db import models
from django.contrib.auth.models import User
from cryptography.fernet import Fernet # Conceptual for encryption

class TeamMateNode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teammate_nodes')
    node_name = models.CharField(max_length=100, default="Primary Omni-Node")
    telegram_bot_token = models.CharField(max_length=255)
    neural_id = models.CharField(max_length=100, help_text="Letta Agent ID")
    mesh_container_id = models.CharField(max_length=100, help_text="Railway ID")
    is_suspended = models.BooleanField(default=False)
    # New Multi-Channel Logic
    channel_config = models.JSONField(default=dict, blank=True, help_text="Config for Telegram, Slack, etc.")
    last_mesh_sync = models.DateTimeField(auto_now=True)

class UserSecret(models.Model):
    """
    Secure Encrypted Storage for API Keys injected into the Neural Mesh.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    key_name = models.CharField(max_length=100, help_text="e.g. DEEPGRAM_API_KEY")
    encrypted_value = models.TextField() # Stored using Fernet/KMS
    last_validated = models.DateTimeField(auto_now=True)

class SkillConfig(models.Model):
    """
    Logical Gate for Agentic capabilities.
    """
    TIERS = [('FREE', 'Free'), ('PRO', 'Pro'), ('ENT', 'Enterprise')]
    
    node = models.ForeignKey(TeamMateNode, on_delete=models.CASCADE)
    skill_id = models.CharField(max_length=50, help_text="voice_mode, deep_research")
    is_active = models.BooleanField(default=False)
    required_env_vars = models.JSONField(default=list, help_text="List of needed secrets")
    tier_required = models.CharField(max_length=10, choices=TIERS, default='PRO')

    def is_runnable(self):
        """Checks if all required secrets exist in DeepSync for this user."""
        secrets = UserSecret.objects.filter(user=self.node.user, key_name__in=self.required_env_vars)
        return secrets.count() == len(self.required_env_vars)
