from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import viewsets
#from .serializers import ZMoteSerializer, FrequencySerializer, ZMoteFreqSerializer
#from django.contrib.auth.models import User
#from .models import ZMote, Frequency, Client
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT
)
from rest_framework.response import Response
import requests
import json

class RegisterView(APIView):

    def get(self, request):
        url = 'http://api.zmote.io/client/register'
        response = requests.get(url)
        name = request.data.get('name')
        content = json.loads(response.content)

        return Response({"detail": content}, status=HTTP_200_OK)

class DiscoverView(APIView):
    def get(self, request):
        #register
        url = 'http://api.zmote.io/client/register'
        response = requests.get(url)
        content = json.loads(response.content)
        secret=content['secret']
        client_id = content['_id']

        #authenticate
        url = 'http://api.zmote.io/client/auth'
        headers =  {'Content-Type':  'application/json'}
        data = {}
        data['secret'] = secret
        data['_id'] = client_id
        json_data = json.dumps(data)
        response = requests.post(url, headers= headers, data=json_data)
        
        #get widgets
        url = 'https://api.zmote.io/widgets' 
        cookies = {'zmote-v2-auth': response.cookies['zmote-v2-auth']}
        response = requests.get(url, cookies=cookies)
        return Response({"zmote(s)":json.loads(response.content)}, status=HTTP_200_OK)

class DiscoverGadgetView(APIView):
    def get(self, request,gadget):
        #register
        url = 'http://api.zmote.io/client/register'
        response = requests.get(url)
        content = json.loads(response.content)
        secret=content['secret']
        client_id = content['_id']

        #authenticate
        url = 'http://api.zmote.io/client/auth'
        headers =  {'Content-Type':  'application/json'}
        data = {}
        data['secret'] = secret
        data['_id'] = client_id
        json_data = json.dumps(data)
        response = requests.post(url, headers= headers, data=json_data)
        
        #get gadgets
        url = 'https://api.zmote.io/widgets/' +gadget+'/gadgets/'
        cookies = {'zmote-v2-auth': response.cookies['zmote-v2-auth']}
        response = requests.get(url, cookies=cookies)
        return Response({"zmote(s)":json.loads(response.content)}, status=HTTP_200_OK)

class EmitIRView(APIView):

    def post(self, request):

        #register
        url = 'http://api.zmote.io/client/register'
        response = requests.get(url)
        content = json.loads(response.content)
        secret=content['secret']
        client_id = content['_id']

        #authenticate
        url = 'http://api.zmote.io/client/auth'
        headers =  {'Content-Type':  'application/json'}
        data = {}
        data['secret'] = secret
        data['_id'] = client_id
        json_data = json.dumps(data)
        response = requests.post(url, headers= headers, data=json_data)
        
        #get local ip
        cookies = {'zmote-v2-auth': response.cookies['zmote-v2-auth']}
        url = 'https://api.zmote.io/widgets' 
        response = requests.get(url, cookies=cookies)
        content = json.loads(response.content)
        l_ip = content['0']['localIP']

        #get mac
        url = 'http://'+ l_ip +'/api/wifi/mac'
        response = requests.get(url, cookies=cookies)
        content = json.loads(response.content)
        mac = content['sta_mac']

        #emit

        #url  ='http://192.168.2.22/5c-cf-7f-13-be-fd/api/ir/write'
        #url  ='http://192.168.1.1/5c-cf-7f-13-be-fd/api/ir/write'
        url  ='http://'+l_ip+'/'+ mac+'/api/ir/write'
        headers =  {"Content-Type":  "application/json"}

        data = {}
        freq = 38000
        n = 6323#68
        seq = [171,172,21,65,21,65,21,65,21,22,21,22,21,22,21,22,21,22,21,65,21,65,21,65,21,22,21,22,21,22,21,22,21,22,21,22,21,65,21,22,21,22,21,22,21,22,21,22,21,22,21,65,21,22,21,65,21,65,21,65,21,65,21,65,21,65,21,1672]
        repeat = [1,0,68]

        data ["frequency"] = freq
        data["n"] = n
        data["seq"] =seq
        data["repeat"] =repeat
        json_data = json.dumps(data)

        response = requests.post(url, data=json_data,headers = headers,cookies=cookies)
        return Response({"detail":json.loads(response.content)}, status=HTTP_200_OK)