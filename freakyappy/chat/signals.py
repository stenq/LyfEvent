from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ChatGroup
from api.models import Event

@receiver(post_save, sender=Event)
def create_chat_for_event(sender, instance, created, **kwargs):
    if created:  # Check if the event is newly created
        # Create the chat with the same title as the event
        chat = ChatGroup.objects.create(event=instance, chat_name=instance.title)
        
        # Add all participants from the event to the chat
        chat.participants.set(instance.participants.all())