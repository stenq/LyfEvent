from rest_framework import serializers
from . models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', "updated", "capacity", "category", "image", "participants", 'date', 'location']
        read_only_fields = ['updated', 'created',]