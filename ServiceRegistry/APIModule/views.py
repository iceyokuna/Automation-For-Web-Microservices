from django.shortcuts import render
from rest_framework import viewsets
from .models import Service, Method, Connecting_method, UserMethod, UserService
from rest_framework.views import APIView
from .serializers import ServiceSerializer, MethodSerializer, ConnectingMethodSerializer, AllServicesSerializer, UserMethodSerializer, UserServiceSerializer, AllUserServicesSerializer
from rest_framework.status import (
    HTTP_503_SERVICE_UNAVAILABLE,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
import json
import requests
from django.conf import settings
from datetime import datetime

class ServiceView(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class MethodView(viewsets.ModelViewSet):
    queryset = Method.objects.all()
    serializer_class = MethodSerializer

class ConnectingMethodView(viewsets.ModelViewSet):
   
    queryset = Connecting_method.objects.all()#filter(method__id = m_id).values()
    serializer_class = ConnectingMethodSerializer

#class UserService(viewsets.ModelViewSet):


class AllServicesView(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = AllServicesSerializer

@permission_classes((AllowAny,))
class ServiceLookupView(APIView):
    def get(self, request):
        return Response({'detail': "GET Methid not available for ServiceCall"},
                        status=HTTP_503_SERVICE_UNAVAILABLE)
    def post(self, request):
        method_id = request.data.get('method_id')
        service_id = request.data.get('service_id')
        queryset_method = Method.objects.filter(id = method_id).values('id','name','path')[0]
        queryset_service = Service.objects.filter(id = service_id).values('id','name','url')[0]
        return Response({'service':queryset_service,'method':queryset_method},status=HTTP_200_OK)

class UserServiceView(APIView):
    def get(self, request):
        url = settings.AUTHENTICATION +'/api/validate_token'
        headers =  { "Authorization" : request.META.get('HTTP_AUTHORIZATION')}
        response = requests.get(url, headers= headers)
        
        if(json.loads(response.content)['username']):
            services = UserService.objects.filter(username=json.loads(response.content)['username']).values()#.values_list('id')
            return Response({"detail": services.values()})
        return Response({"detail": "No services found "})

    def post(self, request):
        url = settings.AUTHENTICATION +'/api/validate_token'
        headers =  { "Authorization" : request.META.get('HTTP_AUTHORIZATION')}
        response = requests.get(url, headers=headers)
        if(json.loads(response.content)['username']):
            username = json.loads(response.content)['username']
            name = request.data.get('name')
            info = request.data.get('info')
            url = request.data.get('url')
            service = UserService.objects.create(username=username, name= name, url = url, info = info )
            return Response({"detail": name+ " has been successfully created","service_id":service.id})####workflow_id
        return Response({"detail": "Unable to creat the service"})

    def put(self, request):
        url = settings.AUTHENTICATION +'/api/validate_token'
        headers =  { "Authorization" : request.META.get('HTTP_AUTHORIZATION')}
        response = requests.get(url, headers=headers)
        if(json.loads(response.content)['username']):
            username = json.loads(response.content)['username']
        else:
            return Response({"detail":  "User unauthorized"}, status=HTTP_400_BAD_REQUEST) 
        if(request.data.get('id')):
            owner = UserService.objects.filter(id=request.data.get('id')).values('username')
            
            if(request.data.get('username') == username):
                new_data =request.data.get('data')
                UserService.objects.filter(id=request.data.get('id')).update(**new_data)

                return Response({"detail": "service successfully updated by "+request.data.get('username')}, status=HTTP_200_OK)
            else:
                return Response({"detail": request.data.get('username') + " does not have access to the service"}, status=HTTP_200_OK) 
        return Response({"detail":  " Unable to make change(s) to the service"}, status=HTTP_200_OK) 
    
class UserMethodView(APIView):
    def get(self, request, service_id=0):

        if(service_id!=0):
            service = UserService.objects.filter(id=  service_id)
            methods = []
            if(service.count() > 0):
                methods = UserMethod.objects.filter(service=service.first()).values()
            return Response({service_id:methods},status = HTTP_200_OK)
            
        return Response({"detail":"Method not found"},status = HTTP_200_OK)

    def post(self, request, service_id=0):
        url = settings.AUTHENTICATION +'/api/validate_token'
        headers =  { "Authorization" : request.META.get('HTTP_AUTHORIZATION')}
        response = requests.get(url, headers=headers)
        if(json.loads(response.content)['username']):
            name = request.data.get('name')
            info = request.data.get('info')
            path = request.data.get('path')
            method_type = request.data.get('method_type')
            service = UserService.objects.filter(id =service_id)
            input_interface = request.data.get('input_interface')
            output_interface = request.data.get('output_interface')
            username = json.loads(response.content)['username']
            if(service.count() > 0 ):
                method= UserMethod.objects.create(name = name, info= info, path = path, method_type=method_type,service=service.first(), input_interface= input_interface, output_interface=output_interface)
                return Response({"detail":"method sucessfully created"},status = HTTP_200_OK)
        return Response({"detail":"Unable to create the method"},status = HTTP_200_OK)

      
class AllUserServiceView(viewsets.ModelViewSet):
    queryset = UserService.objects.all()
    serializer_class = AllUserServicesSerializer
    
    def get_queryset(self):
        url = settings.AUTHENTICATION +'/api/validate_token'
        headers =  { "Authorization" : self.request.META.get('HTTP_AUTHORIZATION')}
        response = requests.get(url, headers=headers)
        if(json.loads(response.content)['username']):
            queryset = self.queryset
            query_set = queryset.filter(username=json.loads(response.content)['username'])
            return query_set
        return {}
        