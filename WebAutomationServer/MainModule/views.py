from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from MainModule.Graphflow.WorkflowEngine import WorkflowEngine
import requests
import pickle
import ast

# Create your views here.

def main_index(request):
    return render(request, 'main_web.html', {})

def end_index(request):
    return render(request, 'end_web.html', {})

#update state from event handler (web hooking)
@csrf_exempt
def TimerUpdateState(request):
    resquest = json.loads(request.body.decode('utf-8'))
    workflowId = resquest['workflowId']
    userId = resquest['userId']

    #read workflow
    workflowEngine_load = WorkflowEngine()

    headers = {"Content-Type":"application/json"}
    url = "http://178.128.214.101:8003/api/workflow/obj/" + str(workflowId)
    response = requests.get(url, headers=headers)
    response = json.loads(response.content)
    workflowEngine_load = pickle.loads(ast.literal_eval(response['detail']['workflowObject']))

    #update state
    task_data = workflowEngine_load.TimerUpdateState(userId)
    print("\n\n\n!!! called !!!\n\n\n")

    #update workflow
    pickled_obj = pickle.dumps(workflowEngine_load)
    pickled_obj_str = str(pickled_obj)
    headers = {"Content-Type":"application/json"}
    url = "http://178.128.214.101:8003/api/internal_workflow/"
    payload = {"id": int(workflowId),"data": {"workflowObject": pickled_obj_str}}
    data = json.dumps(payload)
    r = requests.put(url, headers=headers, data=data)
    print(r.content)

    print("time trigger is triggered")
    msg = {}
    msg['message'] = 'triggered success'
    return HttpResponse(json.dumps(msg),content_type= "application/json")

#get preview of HTML form and FormInputValue
@csrf_exempt
def getPreview(request):
    resquest = json.loads(request.body.decode('utf-8'))
    workflowId = resquest['workflowId']
    taskId = resquest['taskId']

    #read workflow
    workflowEngine_load = WorkflowEngine()

    headers = {"Content-Type":"application/json"}
    url = "http://178.128.214.101:8003/api/workflow/obj/" + str(workflowId)
    response = requests.get(url, headers=headers)
    response = json.loads(response.content)
    workflowEngine_load = pickle.loads(ast.literal_eval(response['detail']['workflowObject']))

    #update state
    #workflowEngine_load
    data = workflowEngine_load.getPreview(str(taskId))
    print("get preview success")
    return HttpResponse(json.dumps(data),content_type= "application/json")
    
@csrf_exempt
def saveFlow(request):
    resquest = json.loads(request.body.decode('utf-8'))
    print(resquest)
    #app name
    app_name = (resquest['name'])

    #header data
    workflow_id = (resquest['workflow_id'])
    workflow_name = (resquest['name'])
    user_token = (resquest['user_token'])

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
    workflowEngine.initialize(workflow_id, workflow_name ,elements_list, HTML_list,
                              service_list, preInput_list, condition_list, timer_list
                              )

    #Workflow Engine Initiate construction and [save]!!!
#    with open('HTMLs.pkl', 'wb') as f:
#        pickle.dump(workflowEngine, f)

    #Save update new workflow object to database
    pickled_obj = pickle.dumps(workflowEngine)
    pickled_obj_str = str(pickled_obj)
    
    headers = {"Authorization":("Token " + str(user_token)), "Content-Type":"application/json"}
    url = "http://178.128.214.101:8003/api/workflow"
    payload = {"id": int(workflow_id),"data": {"workflowObject": pickled_obj_str}}
    data = json.dumps(payload)
    r = requests.put(url, headers=headers, data=data)
    print("----------")
    print(r.content)
    
    #Re-start log of workflow in database
    url = "http://178.128.214.101:8003/api/log/" + str(workflow_id)
    headers = {'Content-type': 'application/json'}
    result = requests.put(url , json = {"logs": {"data" : None}}, headers = headers)
    print("Restart log: " + str(result))

    #Clear Event Queue
    try:
        url = "http://127.0.0.1:5000/clear"
        result = requests.post(url , data= {'workflowId': workflow_id})
        print("Restart Event Queue: " + str(result))
    except:
        print("Event queue is not connecting")

    print("------saved workflow object successfully--------")
    #print all finite state machine defination
    #workflowEngine.showDefination()
    msg = {}
    msg['message'] = 'done'
    return HttpResponse(json.dumps(msg),content_type= "application/json")