from APIModule.models import Method,Service
import requests
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
import json 

class ServiceObj:
    def __init__(self, service_id, header=""):
        self.header = {"Content-Type":"application/json"}
        self.service = Service.objects.filter(id = service_id)
        self.service_url = self.service.values_list('url',flat = True)[0]
    
    def call_method(self, method_id, data):
        method = Method.objects.filter(id = method_id)
        method_path = method.values_list('path',flat = True)[0]
        url = self.service_url + method_path
        method_type = method.values_list('method_type',flat = True)[0]

        if(method_type == 'get'):
            response = requests.get(url, data = data)
            return Response({'data': response.json()}, status = HTTP_200_OK)
        
        elif(method_type == 'post'):
            response = requests.post(url, json = data, headers = self.header)
            return Response({'data': response.json()}, status = HTTP_200_OK)

        else:
            return Response({'detail': method_type},
                        status=HTTP_404_NOT_FOUND)



        
