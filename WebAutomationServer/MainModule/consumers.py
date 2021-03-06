from channels.generic.websocket import WebsocketConsumer
from MainModule.Controller import ClientHandler
from MainModule.Graphflow.WorkflowEngine import WorkflowEngine
import requests
import json
import pickle
import ast

clientController = ClientHandler.ClientHandler()

class MainConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        clientController.addMainUser(self)

    def disconnect(self, close_code):
        print('\nmain client dis-connected\n')
        clientController.removeMainUser(self)

    def receive(self, text_data):
        #case next flow
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)
        #header data
        user_id = message['user']['username']
        user_token = message['user']['token']
        workflow_id = message['currentWorkflowId']

        #read workflow state
        if(message['type'] == "workflow/NEXT_FORM"):
            workflowEngine_load = WorkflowEngine()
#            with open('HTMLs.pkl', 'rb') as f:
#                workflowEngine_load = pickle.load(f)
            #load state from database
            headers = {"Authorization":("Token " + str(user_token)), "Content-Type":"application/json"}
            url = "http://178.128.214.101:8003/api/workflow/obj/" + str(workflow_id)
            response = requests.get(url, headers=headers)
            response = json.loads(response.content)
            workflowEngine_load = pickle.loads(ast.literal_eval(response['detail']['workflowObject']))
            
            #get next html
            task_data = workflowEngine_load.next(message, user_id)
            HTML = task_data["HTML"]
            google = None
            try:
                google = task_data["serviceProvider"]
            except:
                pass

            taskId = task_data["taskId"]

            #when execution is done
            if (HTML == "DONE"): 
                self.send(text_data=json.dumps(
                    {
                        'type': 'workflow/FINISH_ALL_FORM',
                        'taskId': taskId,
                        'form': None,
                        'message' : 'Execution is done'
                    }
                ))
                print("\nsend status DONE ALL FORM\n")
            elif (HTML == "WAIT_LANE"): 
                self.send(text_data=json.dumps(
                    {
                        'type': 'workflow/WAIT',
                        'taskId': taskId,
                        'form': None,
                        'message' : 'Please wait other collaborator for execution !!'
                    }
                )) 
                print("\nsend status WAIT Lane\n")
            elif (HTML == "WAIT_TIME"): 
                self.send(text_data=json.dumps(
                    {
                        'type': 'workflow/WAIT',
                        'taskId': taskId,
                        'form': None,
                        'message' : 'Please wait time event to trigger !!'
                    }
                ))
                print("\nsend status WAIT Time\n")
            else:
                #response to send html form to client
                self.send(text_data=json.dumps(
                {
                    'type': "workflow/NEXT_FORM_SUCCESS",
                    'taskId': taskId,
                    'form': HTML,
                    'serviceProvider':google
                }
                ))
                print("\nsend status NEXT FORM\n")
            
            #write workflow state (update)
#            with open('HTMLs.pkl', 'wb') as f:
#                pickle.dump(workflowEngine_load, f)
            pickled_obj = pickle.dumps(workflowEngine_load)
            pickled_obj_str = str(pickled_obj)

            print("internal_workflow called")
            headers = {"Authorization":("Token " + str(user_token)), "Content-Type":"application/json"}
            headers = {"Content-Type":"application/json"}
            url = "http://178.128.214.101:8003/api/internal_workflow/"
            payload = {"id": int(workflow_id),"data": {"workflowObject": pickled_obj_str}}
            data = json.dumps(payload)
            r = requests.put(url, headers=headers, data=data)
            print(r.content)
            print("internal_workflow called success")

class EndConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        clientController.addEndUser(self)

    def disconnect(self, close_code):
        print('\nend client dis-connected\n')
        clientController.removeEndUser(self)

    def receive(self, json):
        pass