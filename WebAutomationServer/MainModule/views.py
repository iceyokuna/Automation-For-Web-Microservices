from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pickle

# Create your views here.

def main_index(request):
    return render(request, 'main_web.html', {})

def end_index(request):
    return render(request, 'end_web.html', {})

@csrf_exempt
def saveFlow(request):
    resquest = json.loads(request.body.decode('utf-8'))

    #print("APP NAME ++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    #print(resquest['appName'])

    #print("BPMN JSON DATA ++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    workflow_detail = json.loads(resquest['workflowData']['bpmnJson'])
    elements_list = workflow_detail['elements'][0]['elements'][1]['elements']
    print(elements_list)
    #for element in elements_list:
    #    print(element)
    
    #print("GENERATED FORM ++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    #print(resquest['workflowData']['generatedForms'])

    app_name = (resquest['appName'])
    #BPMN_element = (resquest['workflowData']['bpmnJson'])
    HTML_List = (resquest['workflowData']['generatedForms'])
    print(app_name)
    Forms = []
    for element in HTML_List:
        Forms.append(element['formData'])
    with open('HTMLs.pkl', 'wb') as html_file:
        pickle.dump(Forms, html_file)

    print("------saved--------")
    msg = {}
    msg['message'] = 'done'
    return HttpResponse(json.dumps(msg),content_type= "application/json")

     

