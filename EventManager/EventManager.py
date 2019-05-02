from flask import Flask, request, abort
from firebase import firebase
from datetime import date, timedelta
import datetime
import requests

app = Flask(__name__)

#firebase header
url = "https://web-automation-service-client.firebaseio.com/" #firebase db url (event queue)
messager = firebase.FirebaseApplication(url)

#ping firebase server to check time event (to trigger time event)
def checkTimeEvent():
    pass

#Recieve time event (binding)
@app.route('/timeEvent', methods=['POST'])
def timeEvent():
    return "Time Event!"

#Recieve meesage event (binding)
@app.route('/messageEvent', methods=['POST'])
def messageEvent():
    return "Message Event!"

if __name__ == '__main__':
    app.run()