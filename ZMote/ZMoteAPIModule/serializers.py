from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User

class ZMoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'UUID', 'IP', 'username', 'created_at',  'updated_at')
      
