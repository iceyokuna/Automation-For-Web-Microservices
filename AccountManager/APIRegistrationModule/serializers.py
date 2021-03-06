from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from .models import Notification, FcmToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','first_name', 'last_name')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('user','titile','body','click_action','data')

class FcmTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = FcmToken
        fields = ('user','fcmToken')

    def create(self, validated_data):
        #if (FcmToken.objects.filter(user = validated_data['user']).exists()):
            #fcm = FcmToken.objects.filter(user = validated_data['user'])
            #fcm.update(fcmToken= validated_data['fcmToken'])   
           # fcm = super().create(validated_data)
        #else:
        fcm = super().create(validated_data)
        return fcm
