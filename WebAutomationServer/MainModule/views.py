from django.shortcuts import render
import json
from django.http import HttpResponse

# Create your views here.

def main_index(request):
    return render(request, 'main_web.html', {})

def end_index(request):
    return render(request, 'end_web.html', {})

def saveFlow(request):
    resquest = json.loads(request.body.decode('utf-8'))
    msg_client = (resq['message'])
    

