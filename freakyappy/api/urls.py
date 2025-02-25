from django.urls import path
from . import views


urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('events-list/', views.eventList, name='events-list'),
    path('my-events/', views.myEvents, name='my-events'),
    path('events-detail/<str:pk>/', views.eventDetail, name='events-detail'),
    path('events-create/', views.eventCreate, name='events-create'),
    path('events-update/<str:pk>/', views.eventUpdate, name='events-update'),
    path('events-delete/<str:pk>/', views.eventDelete, name='events-delete'),
    path('events-join/<str:pk>/', views.joinEvent, name='events-join'),
    path('events-leave/<str:pk>/', views.leaveEvent, name='events-leave'),
    path("profile/", views.profile_view, name="profile"),
    path('my-joined-events/', views.my_joined_events, name='my-joined-events'),

]
