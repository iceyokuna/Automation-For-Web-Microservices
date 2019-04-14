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
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
    
        #case start flow
        if(message['type'] == "workflow/START_FLOW"):
            workflowEngine_load = WorkflowEngine()
            with open('HTMLs.pkl', 'rb') as f:
                workflowEngine_load = pickle.load(f)

            HTML = workflowEngine_load.next()

            with open('HTMLs.pkl', 'wb') as f:
                pickle.dump(workflowEngine_load, f)

            self.send(text_data=json.dumps(
                { 
                'type': "workflow/START_FLOW_SUCCESS",
                'form': HTML
                }
            ))

        #case next flow
        if(message['type'] == "workflow/NEXT_FORM"):
            workflowEngine_load = WorkflowEngine()
            with open('HTMLs.pkl', 'rb') as f:
                workflowEngine_load = pickle.load(f)
                

            #get next html
            HTML = workflowEngine_load.next()

            if (HTML == "DONE"): 
                self.send(text_data=json.dumps(
                    {'type': 'workflow/FINISH_ALL_FORM', 'data': 'You got the last form already'}
                ))
                return None
 
            with open('HTMLs.pkl', 'wb') as f:
                pickle.dump(workflowEngine_load, f)

            self.send(text_data=json.dumps(
                {
                    'type': "workflow/NEXT_FORM_SUCCESS",
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