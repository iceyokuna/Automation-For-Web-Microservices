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
from apiclient import discovery, http
import httplib2
from oauth2client import client
import json


import os
class CreateView(APIView):

    def post(self, request):
        title = request.data.get('title')
        f_name = request.data.get('f_name')
        l_name = request.data.get('l_name')
        dct = request.data.get('dct')
        
        
        auth = request.data.get('auth')
        AUTH = auth
        SCOPES = ['https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/documents']
        CLIENT_SECRET_FILE = 'DocsAPI/client_secrets.json'
        creds = client.credentials_from_clientsecrets_and_code(
            CLIENT_SECRET_FILE,SCOPES, AUTH)
        
        #import template
        drive_service = discovery.build('drive', 'v3', credentials=creds)
        file_metadata = {'name': title,'mimeType': 'application/vnd.google-apps.document'}
        media = http.MediaFileUpload('DocsAPI/template#1.html',mimetype='text/html',resumable=True)
        file = drive_service.files().create(body=file_metadata,media_body=media).execute()
        
        
        service = discovery.build('docs', 'v1', credentials=creds)
        
        #doc = service.documents().create(body=template).execute()
        #docId = doc.get('documentId')
       
        requests = []
        for i in dct:
            #i = '{{'+i+'}}'
            replace = dct[i]
            requests.append({'replaceAllText': {'containsText': {'text': '{{'+i+'}}' ,'matchCase':  'true'},'replaceText': replace,}})
        
        fileId = file.get('id')
        '''
        requests = [
            {
                'replaceAllText': {
                    'containsText': {
                        'text': '{{f_name}}',
                        'matchCase':  'true'
                    },
                    'replaceText': f_name,
                }}, {
                'replaceAllText': {
                    'containsText': {
                        'text': '{{l_name}}',
                        'matchCase':  'true'
                    },
                    'replaceText': l_name,
                }
            }
        ]
        '''
        result = service.documents().batchUpdate(documentId=fileId, body={'requests': requests}).execute()
        
        return Response({"detail":"https://docs.google.com/document/d/"+file.get("id")+"/edit"}, status=HTTP_200_OK)
        
        # return Response({"detail":requests})