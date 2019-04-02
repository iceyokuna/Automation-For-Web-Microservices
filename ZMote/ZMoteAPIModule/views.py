from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import UserSerializer, ChangePasswordSerializer, UserInfoSerializer
from django.contrib.auth.models import User
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
