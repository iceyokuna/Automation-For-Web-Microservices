from django.shortcuts import render
from rest_framework import viewsets
from .models import Service, Method, Connecting_method
from .serializers import ServiceSerializer, MethodSerializer, ConnectingMethodSerializer, AllServicesSerializer

class ServiceView(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class MethodView(viewsets.ModelViewSet):
    queryset = Method.objects.all()
    serializer_class = MethodSerializer

class ConnectingMethodView(viewsets.ModelViewSet):
    queryset = Connecting_method.objects.all()
    serializer_class = ConnectingMethodSerializer

class AllServicesView(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = AllServicesSerializer