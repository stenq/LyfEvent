from channels.generic.websocket import WebsocketConsumer
from django.shortcuts import get_object_or_404
from .models import ChatGroup, GroupMessage
from asgiref.sync import async_to_sync
import json
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class ChatRoomConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]

        self.chat_name = self.scope["url_route"]["kwargs"]["chat_name"]
        self.chat = ChatGroup.objects.get(chat_name=self.chat_name)

        async_to_sync(self.channel_layer.group_add)(
            self.chat_name, self.channel_name
        )

        if not self.chat.users_online.filter(id=self.user.id).exists():
            self.chat.users_online.add(self.user)
            self.chat.save()  
            self.online_counter() 

        self.accept()

    def disconnect(self, close_code):
        
        if self.user:
            self.chat.users_online.remove(self.user)
            self.chat.save()
            self.online_counter()  # Update online user count if required

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text = text_data_json.get("text", "")

        message = GroupMessage.objects.create(
            text=text,
            author=self.user,
            group=self.chat
        )

        event = {
            "type": "chat_message_handler",
            "message": {
                "id": message.id,
                "author_username": message.author.username,
                "text": message.text,
            },
        }
        async_to_sync(self.channel_layer.group_send)(self.chat_name, event)

    def chat_message_handler(self, event):

        self.send(text_data=json.dumps(event))

    def online_counter(self):
        online_count = self.chat.users_online.count()

        event = {
            "type": "online_count_handler",
            "online_count": online_count,
        }
        async_to_sync(self.channel_layer.group_send)(self.chat_name, event)

    def online_count_handler(self, event):
        # Send the online count to the frontend
        self.send(text_data=json.dumps(event))
