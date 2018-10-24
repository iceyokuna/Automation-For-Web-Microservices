from channels.generic.websocket import WebsocketConsumer
import json

class Consumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        print('\nmain client connected\n')

    def disconnect(self, close_code):
        print('\nmain client dis-connected\n')

    def receive(self, json):
        pass