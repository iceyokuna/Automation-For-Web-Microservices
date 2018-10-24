from channels.generic.websocket import WebsocketConsumer
import json

class Consumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, json):
        pass