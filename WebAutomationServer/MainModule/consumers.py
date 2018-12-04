from channels.generic.websocket import WebsocketConsumer
from MainModule.Controller import ClientHandler
import json

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

        print(message)
        self.send(text_data=json.dumps({
            'message': 'Hello Client!! from Server'
        }))


class EndConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        clientController.addEndUser(self)

    def disconnect(self, close_code):
        print('\nend client dis-connected\n')
        clientController.removeEndUser(self)

    def receive(self, json):
        pass