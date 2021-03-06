from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView

from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_503_SERVICE_UNAVAILABLE,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
import requests
from APICallServiceModule.ServiceObj import ServiceObj
import json

@permission_classes((AllowAny,))
class ServiceCallView(APIView):

    def get(self, request):
        return Response({'detail': "GET Methid not available for ServiceCall"},
                        status=HTTP_503_SERVICE_UNAVAILABLE)

    def post(self, request):
        
        if(request.META.get('HTTP_AUTHORIZATION')):
            headers = {"Content-Type":"application/json","Authorization" : request.META.get('HTTP_AUTHORIZATION')}
        else:
            headers = {"Content-Type":"application/json"}

        data = json.loads(json.dumps(request.data.get("input")))
        service_id = request.data.get("service_id")
        method_id = request.data.get("method_id")

        if(request.data.get("serviceType")):
            service_type = request.data.get("serviceType")
        else:
            service_type = ''
        service = ServiceObj(service_id = service_id, service_type= service_type,headers=headers)
        response = service.call_method(method_id, data = data)
        
        return response

