from django.urls import path
from . import views


urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('events-list/', views.eventList, name='events-list'),
    path('events-detail/<str:pk>/', views.eventDetail, name='events-detail'),
    path('events-create/', views.eventCreate, name='events-create'),
    path('events-update/<str:pk>/', views.eventUpdate, name='events-update'),
    path('events-delete/<str:pk>/', views.eventDelete, name='events-delete'),
]
