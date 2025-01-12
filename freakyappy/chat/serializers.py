from rest_framework import serializers
from . models import ChatGroup, GroupMessage

class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = '__all__'

class GroupMessageSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = GroupMessage
        fields = '__all__'

