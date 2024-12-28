from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EventSerializer
from .models import Event
from rest_framework import status

import base64
from django.core.files.base import ContentFile


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
        serializer.save()
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