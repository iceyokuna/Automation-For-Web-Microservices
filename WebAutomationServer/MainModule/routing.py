# chat/routing.py
from django.conf.urls import url
from django.urls import path
from MainModule import consumers

websocket_urlpatterns = [
    path('execute/', consumers.MainConsumer),
]