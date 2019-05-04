from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import ZMoteSerializer, FrequencySerializer, ZMoteFreqSerializer
from django.contrib.auth.models import User
from .models import ZMote, Frequency, Client
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

class ConnectWifiView(APIView):

    def get(self, request):
        pass

    def post(self, request):
        ip = '192.168.4.1'
        uuid = request.data.get("uuid")
        ssid = request.data.get("ssid")
        pwd = request.data.get("password")
        mac = '5c-cf-7f-13-be-fd'
        
        url = "http://" + ip + "/" + mac + "/api/wifi/connect"
        headers =  {"Content-Type":  "text/plain"}
        data = 'connectwifi ,' + ssid + ',' + pwd #{"ssid":"router","password":"sample"}

        response = requests.post(url, data=data,headers = headers)

class GetMacView(APIView):

    def get(self, request):
        ip = "192.168.2.22"
        url = "http://"+ip+"/api/wifi/mac"
        response = requests.post(url)
        content = json.loads(response.content)
        return Response({"detail":content}, status=HTTP_200_OK)

class RegisterView(APIView):

    def get(self, request):
        url = 'http://api.zmote.io/client/register'
        response = requests.get(url)
        name = request.data.get('name')
        content = json.loads(response.content)
        if(not Client.objects.filter(client_id=content['_id'])):
            c = Client.objects.create(username=request.user.username,name= name, secret=content['secret'],client_id = content['_id'])
        else:
            c = Client.objects.update(username=request.user.username,name=name, client_id = content['_id'])
        return Response({"detail": content}, status=HTTP_200_OK)

class AuthView(APIView):
    
    def post(self, request):
        url = 'http://v1.zmote.io/client/auth'
        headers =  {'Content-Type':  'application/json'}
    
        wifi_id = request.data.get('wifi_id')
        client = Client.objects.filter( id = wifi_id)

        secret = client.values().first()['secret']
        c_id = client.values().first()['client_id']
        data = {}
        data['secret'] = secret
        data['_id'] = c_id
        json_data = json.dumps(data)
        
        response = requests.post(url, headers= headers, data=json_data)
        extIP = json.loads(response.content)['extIP']
        client.update(extIP=extIP)
        
        #return Response({"detail": json.loads(response.content)}, status=HTTP_200_OK)
        return Response({"detail": response.cookies}, status=HTTP_200_OK)

class EmitIRView(APIView):

    def get(self, request):
        return Response({"detail":"GET is not available"}, status=HTTP_200_OK)

    def post(self, request):
        url = 'http://v1.zmote.io/client/auth'
        headers =  {'Content-Type':  'application/json'}
        #data = 
        response = requests.get(url, headers=headers)
        
        headers =  { "Authorization" : request.META.get('HTTP_AUTHORIZATION')}
        response = requests.get(url, headers=headers)
        #if(json.loads(response.content)['username']):



        ip = request.data.get("ip") #192.168.4.1
        uuid = request.data.get("uuid")
        freq = request.data.get("freq")
        c_id = request.data.get("c_id")
        ip =request.data.get("ip")
        #url  ='http://192.168.2.22/5c-cf-7f-13-be-fd/api/ir/write'
        url  ='http://192.168.1.1/5c-cf-7f-13-be-fd/api/ir/write'
        headers =  {"Content-Type":  "application/json"}

        data = {}
        freq = 38000
        n = 68
        seq = [171,172,21,65,21,65,21,65,21,22,21,22,21,22,21,22,21,22,21,65,21,65,21,65,21,22,21,22,21,22,21,22,21,22,21,22,21,65,21,22,21,22,21,22,21,22,21,22,21,22,21,65,21,22,21,65,21,65,21,65,21,65,21,65,21,65,21,1672]
        repeat = [1,0,68]

        data ["frequency"] = freq
        data["n"] = n
        data["seq"] =seq
        data["repeat"] =repeat
        json_data = json.dumps(data)
        response = requests.post(url, data=json_data,headers = headers)
        return Response({"detail":json.loads(response.content)}, status=HTTP_200_OK)

class RecordIRView(APIView):
    def get(self, request):
        mac = request.data.get("mac")
        url = 'http://192.168.1.7/'+ mac +'/api/ir/trigger'
        response = requests.get(url)
        return Response({"detail":response.content}, status=HTTP_200_OK)

class ReadIRView(APIView):
    def get(self, request):
        mac = request.data.get("mac")
        url = 'http://192.168.1.7/'+ mac +'/api/ir/read'
        response = requests.get(url)
        return Response({"detail":response.content}, status=HTTP_200_OK)

class GetUUIDView(APIView):

    def get(self, request):
        ip = request.data.get("ip")
        url = "http://" + ip + "/uuid"
        response = requests.post(url)

    def post(self, request):
        pass

class DiscoverView(APIView):
    def get(self, request):
        url = 'http://api.zmote.io/client/auth'
        headers =  {'Content-Type':  'application/json'}
        data = {}
        data['secret'] = "39lr8TtQ6gNQolW9kr1LYXKzGYkZNFcRdh7jcrrg9N1d6Zco0qMOWNwAxYdGrF19"
        data['_id'] = "5ccbdaa44f0676010049a7d8"
        json_data = json.dumps(data)
        
        response = requests.post(url, headers= headers, data=json_data)
        

        #ip = request.data.get("ip")
        url = 'https://api.zmote.io/widgets' #"http://" + ip + "/discover"

        #r = requests.get(url)
        cookies = {'zmote-v2-auth': response.cookies['zmote-v2-auth']}
        #cookies = {}
        #cookies["zmote-v2-auth"] = "s%3AqT_hmkBlgP8Z4-ib5M9OJG-W_eouoQ6s.vk6%2F4AFG4qA5RslwDwjkekxjXXrTeIB70L2ErKz6PYM"
        #cookies = {'zmote-v2-auth' :"s%3AqT_hmkBlgP8Z4-ib5M9OJG-W_eouoQ6s.vk6%2F4AFG4qA5RslwDwjkekxjXXrTeIB70L2ErKz6PYM"}
        response = requests.get(url, cookies=cookies)#headers = {'Cookie':r.cookies})
        return Response({"detail":json.loads(response.content)}, status=HTTP_200_OK)

class ZMoteView(viewsets.ModelViewSet):
    queryset = ZMote.objects.all()
    serializer_class = ZMoteSerializer

class FrequencyView(viewsets.ModelViewSet):
    queryset = Frequency.objects.all()
    serializer_class = FrequencySerializer

class ZMoteFreqView(viewsets.ModelViewSet):
    queryset = ZMote.objects.all()
    serializer_class = ZMoteFreqSerializer