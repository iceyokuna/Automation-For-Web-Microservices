from rest_framework import serializers
from .models import Service, Method, Connecting_method

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id','name','info')

class MethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Method
        fields = ('id', 'name','info', 'service','input_interface','output_interface')

class ConnectingMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connecting_method
        fields = ('id', 'method','connecting_method')