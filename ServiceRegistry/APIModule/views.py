from django.shortcuts import render
from rest_framework import viewsets
from .models import Service, Method, Connecting_method, UserMethod, UserService
from rest_framework.views import APIView
from .serializers import ServiceSerializer, MethodSerializer, ConnectingMethodSerializer, AllServicesSerializer, UserMethodSerializer, UserServiceSerializer, AllUserServicesSerializer
from rest_framework.status import (
    HTTP_503_SERVICE_UNAVAILABLE,
    HTTP_200_OK
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
import json

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
        if(request.data.get('username')):
            services = UserService.objects.filter(username=request.data.get('username')).values()#.values_list('id')
            #method = []
            #if(services.count() >0):
            #    method = UserMethod.objects.filter(service__in = services)
            return Response({"detail": services.values()})
        return Response({"detail": "No services found "})

    def post(self, request):
        if(request.data.get('username')):
            name = request.data.get('name')
            info = request.data.get('info')
            url = request.data.get('url')
            UserService.objects.create(username=request.data.get('username'), name= name, url = url, info = info )
            return Response({"detail": name+ " has been successfully created"})
        return Response({"detail": "Unable to creat the service"})

    def put(self, request):
        if(request.data.get('id')):
            owner = UserService.objects.filter(id=request.data.get('id')).values('username')
            if(request.data.get('username') == owner[0].get('username')):
                new_data =request.data.get('data')
                UserService.objects.filter(id=request.data.get('id')).update(**new_data)

                return Response({"detail": "service successfully updated by "+request.data.get('username')}, status=HTTP_200_OK)
            else:
                return Response({"detail": request.data.get('username') + " does not have access to the service"}, status=HTTP_200_OK) 
        return Response({"detail":  " Unable to make change(s) to the service"}, status=HTTP_200_OK) 
    
class UserMethodView(APIView):
    def get(self, request):
        if(request.data.get('service_id')):
            service = UserService.objects.filter(id=  request.data.get('service_id'))
            methods = []
            if(service.count() > 0):
                methods = UserMethod.objects.filter(service=service.first()).values()
            return Response({"detail":methods},status = HTTP_200_OK)
            
        return Response({"detail":"Method not found"},status = HTTP_200_OK)

    def post(self, request):
        if(request.data.get('username')):
            name = request.data.get('name')
            info = request.data.get('info')
            path = request.data.get('path')
            method_type = request.data.get('method_type')
            service = UserService.objects.filter(id = request.data.get('service_id'))
            input_interface = request.data.get('input_interface')
            output_interface = request.data.get('output_interface')
            if(service.count() > 0 ):
                method= UserMethod.objects.create(name = name, info= info, path = path, method_type=method_type,service=service.first(), input_interface= input_interface, output_interface=output_interface)
                return Response({"detail":"method sucessfully created"},status = HTTP_200_OK)
        return Response({"detail":"Unable to create the method"},status = HTTP_200_OK)

    

class AllUserServiceView(viewsets.ModelViewSet):
    queryset = UserService.objects.all()
    serializer_class = AllUserServicesSerializer
    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(username=self.request.data.get('username'))
        return query_set




    