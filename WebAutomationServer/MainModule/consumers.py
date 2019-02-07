from channels.generic.websocket import WebsocketConsumer
from MainModule.Controller import ClientHandler
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
        global html_index
        global HTMLs

        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        #case start flow
        if(message['type'] == "workflow/START_FLOW"):
            html_index= 0
            HTMLs = []
            loadlist = []
            with open('HTMLs.pkl', 'rb') as f:
                loadlist = pickle.load(f)
            HTMLs = loadlist
            self.send(text_data=json.dumps(
                { 
                'type': "workflow/START_FLOW_SUCCESS",
                'form': HTMLs[html_index]
                }
            ))
            html_index += 1

        #case next flow
        if(message['type'] == "workflow/NEXT_FORM"):
            try:
                self.send(text_data=json.dumps(
                    {
                        'type': "workflow/NEXT_FORM_SUCCESS",
                'form':HTMLs[html_index]
                    }
                ))
                html_index += 1
            except IndexError:
                self.send(text_data=json.dumps(
                    {'type': 'workflow/FINISH_ALL_FORM', 'data': 'You got the last form already'}
                ))

        # self.send(text_data=json.dumps({
        #     'message': 'Good morning from server'
        # }))


class EndConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        clientController.addEndUser(self)

    def disconnect(self, close_code):
        print('\nend client dis-connected\n')
        clientController.removeEndUser(self)

    def receive(self, json):
        pass