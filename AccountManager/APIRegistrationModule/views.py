from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import UserSerializer, ChangePasswordSerializer, UserInfoSerializer, NotificationSerializer, FcmTokenSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED
)
from rest_framework.response import Response
from .models import Notification, FcmToken
import json
import requests
@permission_classes((AllowAny,))
class RegisterView(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response( serializer.data, status= HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

@permission_classes((IsAuthenticated,))
class ChangePasswordView(APIView):

    def get_object(self, queryset=None):
        return self.request.user

#put
    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]}, 
                                status=HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({"datail":"Password has been successfully changed"},status=HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST) 

@permission_classes((AllowAny,))
class AllUserView(viewsets.ModelViewSet):
    queryset = User.objects.order_by('username')
    serializer_class = UserInfoSerializer

@permission_classes((IsAuthenticated,))
class NotificationView(APIView):

    def get(self, request):
        queryset = Notification.objects.filter(user=request.user.username).values('data')#.order_by('-created').values()
        return Response({'notifications': queryset}, status=HTTP_200_OK)
   
    def post(self, request):
        noti = Notification.objects.create(user=request.user, data = request.data.get('data'))#, title=request.data.get('title'),body=request.data.get('body'),click_action =request.data.get('click_action'), data=request.data.get('data'))
        return Response({"detail": "successfully created"})

    def put(self, request):
        '''
        read_flags =request.data.get('read_flags')
        for i in read_flags:
            noti = Notification.objects.filter(id=i).update(readFlag=True)
        '''
        noti = Notification.objects.filter(user=request.user).update(data = request.data.get('data'))
        return Response({"detail": "successfully updated"})

@permission_classes((AllowAny,))
class SendNotificationView(APIView):
    def post(self, request):
        to = request.data.get('to')
        body = request.data.get('body')
        title = request.data.get('title')
        data = request.data.get('data')
        click_action = request.data.get('click_action')

        url = 'https://fcm.googleapis.com/fcm/send'
        key = 'key=AAAAvAxbvG8:APA91bFUI5zOJF0ITlKBDbdGJRGN70ENPiAM3WaNjOiMyOi6XBS-BnWyhvVUHk8BPZDSr2pmLuzQrt3m497wKIG51--G7DzGlEAeVoA9G8Fx3pfPQlYl11zZ-xdmfC5Za0ILS011Fe9y'
        headers =   {'Content-Type':  'application/json', 'Authorization':key}
        noti = request.data.get('notification')
        
        for i in to:
            user = User.objects.filter(username = i).first()
            token = FcmToken.objects.filter(user=user).values('fcmToken').first()['fcmToken']

            data = {"to":token,"notification":{"title":title, "body":body, "click_action":click_action,"data":data}}
            data = json.dumps(data)

            res =  requests.post(url, headers=headers, data=data)
            noti = Notification.objects.create(user=user, title=title,body=body,click_action =click_action, data=data)
        return Response({"detail": "successfully created"})

@permission_classes((IsAuthenticated,))
class FcmTokenView(viewsets.ModelViewSet):
    queryset = FcmToken.objects.all()
    serializer_class = FcmTokenSerializer
    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if(FcmToken.objects.filter(user = self.request.user).exists()):
            fcm = FcmToken.objects.filter(user = self.request.user).first()
            serializer.update(fcm, request.data)
        else:
            self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
    
