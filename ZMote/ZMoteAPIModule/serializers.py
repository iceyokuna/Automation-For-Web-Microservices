from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from .models import ZMote, Frequency

class ZMoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZMote
        fields = ('id', 'name', 'UUID', 'IP')
      
class FrequencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Frequency
        fields = ('id', 'ZMote', 'name', 'frequency', 'n', 'sequence',  'repeat')
      
class ZMoteFreqSerializer(serializers.ModelSerializer):
    frequency = FrequencySerializer(many=True, read_only=True)
 
    class Meta:
        model = ZMote
        fields = ('id','name','UUID','IP','frequency')
      