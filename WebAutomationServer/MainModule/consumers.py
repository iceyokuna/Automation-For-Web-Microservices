from channels.generic.websocket import WebsocketConsumer
from MainModule.Controller import ClientHandler
from MainModule.Graphflow.WorkflowEngine import WorkflowEngine
import json
import pickle

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

        #read workflow state
        if(message['type'] == "workflow/NEXT_FORM"):
            workflowEngine_load = WorkflowEngine()
            with open('HTMLs.pkl', 'rb') as f:
                workflowEngine_load = pickle.load(f)

            #get next html
            task_data = workflowEngine_load.next(message)
            HTML = task_data["HTML"]
            taskId = task_data["taskId"]

            #when execution is done
            if (HTML == "DONE"): 
                self.send(text_data=json.dumps(
                    {
                        'type': 'workflow/FINISH_ALL_FORM',
                        'taskId': taskId,
                        'form': None
                    }
                )) 
                return            
 
            #write workflow state (update)
            with open('HTMLs.pkl', 'wb') as f:
                pickle.dump(workflowEngine_load, f)

            #response to send html form to client
            self.send(text_data=json.dumps(
                {
                    'type': "workflow/NEXT_FORM_SUCCESS",
                    'taskId': taskId,
                    'form': HTML
                }
            ))

class EndConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        clientController.addEndUser(self)

    def disconnect(self, close_code):
        print('\nend client dis-connected\n')
        clientController.removeEndUser(self)

    def receive(self, json):
        pass