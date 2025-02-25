from rest_framework import serializers
from . models import Event
from .models import UserProfile
from django.conf import settings

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'host', 'title', 'description', "updated", "capacity", "category", "image", "participants", 'date', 'location', ]
        read_only_fields = ['updated', 'created', 'host']

    
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = UserProfile
        fields = ["username", "profile_picture"]

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return f"{settings.MEDIA_URL}{obj.profile_picture.url}"
        return None  # or return a default URL