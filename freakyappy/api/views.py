from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import EventSerializer
from .models import Event
from rest_framework import status

import base64
from django.core.files.base import ContentFile
from .models import UserProfile
from .serializers import UserProfileSerializer
@api_view(['GET'])
def apiOverview(request):


    api_urls = [
        {
            'Endpoint': '/events-list/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of events'
        },
        {
            'Endpoint': '/my-events/',
            'method': 'GET',
            'body': None,
            'description': "Returns an array of host's events"
        },
        {
            'Endpoint': '/events-detail/<str:pk>',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single event object'
        },
        {
            'Endpoint': '/events-create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new event with data sent in post request'
        },
        {
            'Endpoint': '/events-update/<str:pk>/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing event with data sent in post request'
        },
        {
            'Endpoint': '/events-delete/<str:pk>/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes an exiting event'
        },
        
        {
            'Endpoint': '/token/',
            'method': 'POST',
            'body': {'body': ""},
            'description': "Access token"
        },

        {
            'Endpoint': '/token-refresh/',
            'method': 'POST',
            'body': {'body': ""},
            'description': "Access token"
        },
    ]
    
    return Response(api_urls)

@api_view(['GET'])
def eventList(request):
    events = Event.objects.all().order_by('-updated')
    serializer = EventSerializer(events, many=True )
    return Response(serializer.data)


@api_view(['GET'])
def eventDetail(request, pk):
    events = Event.objects.get(id=pk)
    serializer = EventSerializer(events, many=False )
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def eventCreate(request):
    serializer = EventSerializer(data=request.data)
    
    #decoding image from url to file
    if 'image' in request.data:
    # Get the base64 image string
        format, imgstr = request.data['image'].split(';base64,') 
        ext = format.split('/')[-1]  # Extract the image extension (e.g., 'png', 'jpeg')

        # Decode the base64 image string and create a ContentFile to attach to the serializer
        image_data = base64.b64decode(imgstr)
        image_name = f"{request.data['title']}_image.{ext}"  # Naming the image dynamically based on event title
        request.data['image'] = ContentFile(image_data, name=image_name) 
    
    if serializer.is_valid():
        event = serializer.save(host=request.user)
        event.participants.add(request.user)

        return Response({
            "status": "success",
            "message": "Event created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        "status": "error",
        "message": "Invalid data",
        "errors": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['PUT'])
def eventUpdate(request, pk):
    try:
        event = Event.objects.get(id=pk)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=404)

    serializer = EventSerializer(instance=event, data=request.data)

    if 'image' in request.data:
    # Get the base64 image string
        format, imgstr = request.data['image'].split(';base64,') 
        ext = format.split('/')[-1]  # Extract the image extension (e.g., 'png', 'jpeg')

        # Decode the base64 image string and create a ContentFile to attach to the serializer
        image_data = base64.b64decode(imgstr)
        image_name = f"{request.data['title']}_image.{ext}"  # Naming the image dynamically based on event title
        request.data['image'] = ContentFile(image_data, name=image_name) 
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response({
        "status": "error",
        "message": "Invalid data",
        "errors": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eventDelete(request, pk):
    event = Event.objects.get(id=pk)
    event.delete()

    return Response("SUCCESFULLY DELETED")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myEvents(request):
    my_events = Event.objects.filter(host=request.user).order_by('-updated') 
    serializer = EventSerializer(my_events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def joinEvent(request, pk):

    user = request.user

    event = Event.objects.get(id=pk)
    
    event.participants.add(user)
    event.save()

    serializer = EventSerializer(event)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def leaveEvent(request, pk):

    user = request.user

    event = Event.objects.get(id=pk)

    event.participants.remove(user)
    event.save()

    serializer = EventSerializer(event)
    return Response(serializer.data)

@api_view(["GET","PUT"])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user

    # Get or create the profile
    profile, created = UserProfile.objects.get_or_create(user=user)
    if request.method == "GET": 
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)  # ✅ Return profile data
    
    
    elif request.method == "PUT":
        try:
            user.username = request.data.get("username", user.username)

            if "profile_picture" in request.FILES:
                profile.profile_picture = request.FILES["profile_picture"]
                profile.save()  # Save profile image separately

            user.save()

            return Response({
                "username": user.username,
                "profile_picture": profile.profile_picture.url if profile.profile_picture else None
            }, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_joined_events(request):
    try:
        # Get events the user has joined but did NOT create
        events = Event.objects.filter(participants=request.user).exclude(host=request.user)

        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=200)

    except Exception as e:
        print("Error fetching joined events:", str(e))  # Debugging
        return Response({"error": "Something went wrong"}, status=500)
