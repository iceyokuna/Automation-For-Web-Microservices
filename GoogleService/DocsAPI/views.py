from django.contrib.auth.models import User
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
from apiclient import discovery
import httplib2
from oauth2client import client
from django.conf import settings
# Create your views here.
import gspread
import os
from rest_framework.views import APIView

from googleapiclient.discovery import build
from apiclient import discovery
import httplib2
from oauth2client import client
import json

import os
class CreateView(APIView):

    def post(self, request):
        AUTH = "4/WQFhORcnikJSJNpnriPVU4hUXwB6Fjw1F1wbpZ8sPn8-Z1sMzOEvy-UHG5eTzI5iI5XubFpMky4VwTP0K-2NEUY"
        SCOPES = ['https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/documents.readonly']

     
        CLIENT_SECRET_FILE = 'DocsAPI/client_secrets.json'
        creds = client.credentials_from_clientsecrets_and_code(
            CLIENT_SECRET_FILE,SCOPES, AUTH)
        
        service = discovery.build('docs', 'v1', credentials=creds)

        #title = 'Test document'
        body = {
            'title': "test2222"
        }
        doc = service.documents().create(body=body).execute()
        return Response({"detail":"done"}, status=HTTP_200_OK)
        
