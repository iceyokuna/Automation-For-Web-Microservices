from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from MainModule.Graphflow.WorkflowEngine import WorkflowEngine
import pickle
import ast

# Create your views here.

def main_index(request):
    return render(request, 'main_web.html', {})

def end_index(request):
    return render(request, 'end_web.html', {})

#update state from event handler (web hooking)
@csrf_exempt
def updateState(request):
    pass

@csrf_exempt
def saveFlow(request):
    resquest = json.loads(request.body.decode('utf-8'))
    print(resquest)
    #app name
    app_name = (resquest['name'])

    #bpmn data
    workflow_detail = resquest['bpmnJson']
    elements_list = workflow_detail['elements'][0]['elements'][1]['elements']

    #Extract form data, service data, input output data
    HTML_list = (resquest['generatedForms'])
    service_list = (resquest['appliedMethods'])
    preInput_list = (resquest['appliedPreInputs'])
    condition_list = (resquest['appliedConditions'])
    timer_list = (resquest['appliedTimers'])

    #initialize workflow engine instance
    workflowEngine = WorkflowEngine()
    workflowEngine.initialize(elements_list, HTML_list, service_list, preInput_list, condition_list, timer_list)

    #Workflow Engine Initiate construction and [save]!!!
#    with open('HTMLs.pkl', 'wb') as f:
#        pickle.dump(workflowEngine, f)

    #Save update new workflow in firebase   
    pickled_obj = pickle.dumps(workflowEngine)
    pickled_obj_str = str(pickled_obj)

    headers = {"Authorization":"Token b78fba1a07dabd78c234e57eed52a527dcabca0e", "Content-Type":"application/json"}
    url = "http://178.128.214.101:8003/api/workflow"
    payload = {"id": 106,"data": {"workflowObject": pickled_obj_str}}
    data = json.dumps(payload)
    r = requests.put(url, headers=headers, data=data)
    print(r.content)

    print("------saved workflow object successfully--------")
    #print all finite state machine defination
    #workflowEngine.showDefination()
    msg = {}
    msg['message'] = 'done'
    return HttpResponse(json.dumps(msg),content_type= "application/json")