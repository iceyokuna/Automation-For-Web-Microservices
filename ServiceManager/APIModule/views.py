from django.shortcuts import render
from django.db import models

from APIModule.models import service, method, connecting_method
from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

#from.django.util



# Create your views here.
def create_service(request):
    s_name = "Email"
    s_info = "Sending emails"

    service.objects.create( service_name = s_name, service_info = s_info)
    return HttpResponse("done")

def add_method(request):
    s_id = service.objects.get(id = 1)
    m_name = "send_email"
    m_info = "Sending emails"

    method.objects.create( service_id = s_id, method_name = m_name, method_info = m_info)
    return HttpResponse("done")

def update_service(request):
    main_id = 1
    
    data = service.objects.all().values('output_interface')
    main_data = json.dumps(list(posts))

    #all_data = 

#    for i in
    return HttpResponse("done")

def get_available_methods(request):
    data = connecting_method.objects.filter(id= s_id).values('connecting_method')
    json_data = json.dumps(list(data)[0])
    return HttpResponse(json_data)

def get_method(request):
    #s_id = request['POST'].get("s_id")
    s_id = 1
    data = method.objects.filter(id= s_id).values()
    data_json = serializers.serialize("json", data)
    return HttpResponse(data_json, content_type='application/json')

def get_all_services(request):
    data = service.objects.all().values()
    json_data = json.dumps(list(data))
    return HttpResponse(json_data)


@csrf_exempt
def get_all_methods(request):
    if request.method == "POST":
      requestJson = json.loads(request.body)
      print(requestJson)
      serviceId = requestJson['serviceId']
      data = method.objects.filter(service_id = serviceId).values()
      json_data = json.dumps(list(data))
      return HttpResponse(json_data)
    
    data = method.objects.filter(service_id = 1).values()
    json_data = json.dumps(list(data))
    return HttpResponse(json_data)


def get_service_info(request):
    data = service.objects.all().values('service_name','service_info')
    return HttpResponse(data)


def get_service(request):
    data = service.objects.all().values()
    json_data = json.dumps(list(data)[0])
    return HttpResponse(json_data)

def get_service(request):
    data = service.objects.all().values()
    return HttpResponse(data)

def get_method_output_req(request):
    s_id = request.POST['service_id']
    #s_id = 1
    data = method.objects.filter(id= s_id).values('output_interface')
    #connecting_service = service_input_requirement.objects.filter(id=s_id).values('json_requirement')
    #return HttpResponse(data.typeof())
    return HttpResponse(data)

def get_method_input_req(request):
    #s_id = request.POST['service_id']
    s_id = 1
    data = method.objects.filter(id= s_id).values('input_interface')
    return HttpResponse(data)