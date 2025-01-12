from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("chat/<str:chat_name>/", views.chat_view, name= "chat_view"),

]