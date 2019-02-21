from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from MainModule.Graphflow.WorkflowEngine import WorkflowEngine
import pickle

# Create your views here.

def main_index(request):
    return render(request, 'main_web.html', {})

def end_index(request):
    return render(request, 'end_web.html', {})

@csrf_exempt
def saveFlow(request):
    resquest = json.loads(request.body.decode('utf-8'))

    #app name
    app_name = (resquest['appName'])

#    print(resquest)

    #bpmn data
    workflow_detail = json.loads(resquest['workflowData']['bpmnJson'])
    elements_list = workflow_detail['elements'][0]['elements'][1]['elements']
#   print(elements_list)

    #HTML form data
    HTML_List = (resquest['workflowData']['generatedForms'])

    #Service Binding Infomation
    service_List = (resquest['workflowData']['appliedMethods'])
#    print(service_List)


    #initialize workflow engine instance
    workflowEngine = WorkflowEngine()
    workflowEngine.initialize(elements_list, HTML_List)

    #Workflow Engine Initiate construction and save
    with open('HTMLs.pkl', 'wb') as f:
        pickle.dump(workflowEngine, f)

    #Bind services to WorkflowEngine
    workflowEngine.bindService(service_List)

    print("------saved--------")
    msg = {}
    msg['message'] = 'done'
    return HttpResponse(json.dumps(msg),content_type= "application/json")