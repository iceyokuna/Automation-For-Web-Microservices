from django.shortcuts import render
from django.db import models

from APIModule.models import service, connecting_service
from django.core import serializers
from django.http import HttpResponse
import json

# Create your views here.
def create_service(request):
    s_name = "Email"
    s_info = "Sending emails"
    i_interface = ""
    o_interface = ""

    service.objects.create(id = 1, service_name = s_name, service_info = s_info, input_interface = i_interface,output_interface = o_interface )
    return HttpResponse("done")

def update_service(request):
    main_id = 1
    
    data = service.objects.all().values('output_interface')
    main_data = json.dumps(list(posts))

    all_data = 

    for i in
    return HttpResponse("done")

def get_available_service(request):
    data = connecting_service.objects.filter(id= s_id).values('connecting_service')
    
    return HttpResponse(data)

def get_service_output_req(request):
    #s_id = request.POST['service_id']
    s_id = 1
    data = service.objects.filter(id= s_id).values('output_interface')
    #connecting_service = service_input_requirement.objects.filter(id=s_id).values('json_requirement')
    return HttpResponse(data.typeof())
    #return HttpResponse(data)

def get_service_input_req(request):
    #s_id = request.POST['service_id']
    s_id = 1
    data = service.objects.filter(id= s_id).values('input_interface')
    return HttpResponse(data)