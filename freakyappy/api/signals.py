from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from .models import Event
from chat.models import ChatGroup

@receiver(m2m_changed, sender=Event.participants.through)
def update_chat_participants(sender, instance, action, reverse, model, pk_set, **kwargs):
    if reverse:
        return  # We don't need to handle reverse changes (e.g., changes to `User`)

    # Ensure the chat exists for this event
    try:
        chat = ChatGroup.objects.get(event=instance)
    except ChatGroup.DoesNotExist:
        return

    if action == 'post_add':  # When participants are added to the event
        chat.participants.add(*pk_set)  # Add new participants to the chat
    elif action == 'post_remove':  # When participants are removed from the event
        chat.participants.remove(*pk_set)  # Remove participants from the chat
    elif action == 'pre_clear':  # When all participants are cleared from the event
        chat.participants.clear()  # Clear all participants in the chat