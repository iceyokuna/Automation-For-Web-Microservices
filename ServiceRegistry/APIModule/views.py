from django.shortcuts import render
from rest_framework import viewsets
from .models import Service, Method, Connecting_method
from rest_framework.views import APIView
from .serializers import ServiceSerializer, MethodSerializer, ConnectingMethodSerializer, AllServicesSerializer
from rest_framework.status import (
    HTTP_503_SERVICE_UNAVAILABLE,
    HTTP_200_OK
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
class ServiceView(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class MethodView(viewsets.ModelViewSet):
    queryset = Method.objects.all()
    serializer_class = MethodSerializer

class ConnectingMethodView(viewsets.ModelViewSet):
   
    queryset = Connecting_method.objects.all()#filter(method__id = m_id).values()
    serializer_class = ConnectingMethodSerializer

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
