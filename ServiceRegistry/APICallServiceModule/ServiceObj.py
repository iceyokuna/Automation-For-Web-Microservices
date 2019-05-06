from APIModule.models import Method,Service, UserService, UserMethod
import requests
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
import json 

class ServiceObj:
    def __init__(self, service_id, service_type='',headers={"Content-Type":"application/json"}):
        self.headers = headers
        self.service = Service.objects.filter(id = service_id)
        self.service_url = self.service.values_list('url',flat = True)[0]
        self.service_type = service_type
        if(self.service_type=='userService'):
            self.service = UserService.objects.filter(id = service_id)
        else:
            self.service = Service.objects.filter(id = service_id)

    def call_method(self, method_id, data = ""):
        if(self.service_type=='userService'):
            method = UserMethod.objects.filter(id = method_id)
        else:
            method = Method.objects.filter(id = method_id)
            
        method_path = method.values_list('path',flat = True)[0]
        url = self.service_url + method_path
        method_type = method.values_list('method_type',flat = True)[0]
        

        if(method_type == 'get' ):
            response = requests.get(url, data = data, headers=self.headers)
            return Response({'data': response}, status = HTTP_200_OK)

        
        elif(method_type == 'post' ):
            response = requests.post(url, data = data, headers = self.headers)
            return Response({'data': response}, status = HTTP_200_OK)

        else:
            return Response({'detail': method_type},
                        status=HTTP_404_NOT_FOUND)



        
