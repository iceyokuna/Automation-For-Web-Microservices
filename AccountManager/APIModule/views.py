from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response

#@csrf_exempt
#@api_view(["POST"])
@permission_classes((AllowAny,))
class LoginView(APIView):
    

    def get(self, request):
        return Response( status=HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                            status=HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)

        if not user:
            return Response({'error': 'Invalid Credentials'},
                            status=HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)
        request.session.set_expiry(600) 
        return Response({'token': token.key, 'username':user.username, 'firstName':user.first_name,'lastName':user.last_name},
                        status=HTTP_200_OK)

@permission_classes((IsAuthenticated,))
class LogoutView(APIView):
    def get(self, request):
        #session.flush()
        #request.user.auth_token.delete()
        return Response(status=HTTP_400_BAD_REQUEST)
    
    def post(self, request):    
        request.session.flush()
        request.user.auth_token.delete()
        return Response({'detail':'Successfully logged out'},status=HTTP_200_OK)


@permission_classes((IsAuthenticated,))
class ValidateTokenView(APIView):
    def get(self, request):
        return Response({'detail':'Successfully validated','username':request.user.username},status=HTTP_200_OK)
    


