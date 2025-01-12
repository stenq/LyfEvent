from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ChatGroupSerializer, GroupMessageSerializer
from rest_framework import status
from .models import ChatGroup, GroupMessage


@permission_classes([IsAuthenticated])
@api_view(['POST', 'GET'])
def chat_view(request, chat_name):
    try:
        # Fetch the ChatGroup by name
        chat_group = ChatGroup.objects.get(chat_name=chat_name)
    except ChatGroup.DoesNotExist:
        return Response({"error": "Chat group not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Retrieve last 30 messages
        chat_messages = chat_group.chat_messages.all().order_by('created')[:30]
        serializer_chat = GroupMessageSerializer(chat_messages, many=True)

        # Return group info and messages
        serializer_group = ChatGroupSerializer(chat_group)
        return Response({
            "chat_group": serializer_group.data,
            "chat_messages": serializer_chat.data,
        }, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # Handle new message creation
        serializer = GroupMessageSerializer(data=request.data)
        if serializer.is_valid():
            # Save the message and associate it with the group
            message = serializer.save(author=request.user, group=chat_group)
            return Response(GroupMessageSerializer(message).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)