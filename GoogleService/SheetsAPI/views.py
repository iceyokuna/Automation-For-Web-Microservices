from django.shortcuts import render
from pprint import pprint

from googleapiclient import discovery
from django.shortcuts import render
    
# Create your views here.
from rest_framework.views import APIView
from rest_framework import viewsets
#from .serializers import ZMoteSerializer, FrequencySerializer, ZMoteFreqSerializer
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
class CreateView(APIView):
    def post(self, request):
        
        CLIENT_SECRET_FILE = 'client_secrets.json'
        auth_code = "4/PQELICMYJTtywERyDS8nkvp-xH3NKs7Qxuw4YeIZ-WscCBhVpifvX_ZQ02hvLt8j_tjROM_8wX74NPLK82dzB2I"

        credentials = client.credentials_from_clientsecrets_and_code(
            CLIENT_SECRET_FILE,
            ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets.readonly'],
            auth_code)

        service = discovery.build('sheets', 'v4',  credentials=credentials)

        sheet = service.spreadsheets()

        spreadsheet = {
            'properties': {
                'title': "TEST SHEET API"
            }
        }
        spreadsheet = sheet.create(body=spreadsheet,
                                            fields='spreadsheetId').execute()
        print('Spreadsheet ID: {0}'.format(spreadsheet.get('spreadsheetId')))
        
        return Response({"detail":"Done"}, status=HTTP_200_OK)
