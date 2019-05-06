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

class CreateView(APIView):
    def post(self, request):
        CLIENT_SECRET_FILE = datafile(settings.GOOGLE_CREDENTIALS)
        auth_code = "4/QgGYg6gF4Apvcaa_Vb2mQXQpbFxZqqnBAMYNdoURV6MQgrFX5ECzeaTe03wMr4QWPGdjk_doWDVulUfHWeJIhEQ"
        credentials = client.credentials_from_clientsecrets_and_code(CLIENT_SECRET_FILE,['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets.readonly'],auth_code)
        service = discovery.build('sheets', 'v4', credentials=credentials)

        spreadsheet_body = {
            {'properties': {'title': 'My new Sheet'}}
        }

        request = service.spreadsheets().create(body=spreadsheet_body)
        response = request.execute()

        #pprint(response)
        return response#Response({"detail":content}, status=HTTP_200_OK)
'''
class GetView(APIView):
    def get(self, request):
        credentials = request.data.get('token')

        service = discovery.build('sheets', 'v4', credentials=credentials)

        spreadsheet_id = request.data.get('spreadsheet_id')#'my-spreadsheet-id' 

        ranges = []  

        include_grid_data = False  # TODO: Update placeholder value.

        request = service.spreadsheets().get(spreadsheetId=spreadsheet_id, ranges=ranges, includeGridData=include_grid_data)
        response = request.execute()

        # TODO: Change code below to process the `response` dict:
        #pprint(response)
        return response


class SpreadsheetSnippets(object):
    def __init__(self):
        credentials = "4/QgGYg6gF4Apvcaa_Vb2mQXQpbFxZqqnBAMYNdoURV6MQgrFX5ECzeaTe03wMr4QWPGdjk_doWDVulUfHWeJIhEQ"
        
        self.service = service = discovery.build('sheets', 'v4', credentials=credentials)#service

    def create(self, title):
        service = self.service
        # [START sheets_create]
        spreadsheet = {
            'properties': {
                'title': title
            }
        }
        spreadsheet = service.spreadsheets().create(body=spreadsheet,
                                            fields='spreadsheetId').execute()
        print('Spreadsheet ID: {0}'.format(spreadsheet.get('spreadsheetId')))
        # [END sheets_create]
        return spreadsheet.get('spreadsheetId')


class UpdateView(APIView):
    def post(self, request):
        requests = []
        if(request.data.get("title")):
                requests.append({
                    'updateSpreadsheetProperties': {
                        'properties': {
                            'title': title
                        },
                        'fields': 'title'
                    }
                })
        if(request.data.get('find')):
            requests.append({
                'findReplace': {
                    'find': find,
                    'replacement': replacement,
                    'allSheets': True
                }
            })
        if(request.data.get('body')):

            body = {
                'requests': requests
            }
        response = service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body=body).execute()
        find_replace_response = response.get('replies')[1].get('findReplace')
        print('{0} replacements made.'.format(
            find_replace_response.get('occurrencesChanged')))
'''