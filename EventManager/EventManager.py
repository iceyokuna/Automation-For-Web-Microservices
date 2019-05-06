from flask import Flask, request, abort, jsonify
from firebase import firebase
from datetime import date, timedelta
from BackgroundThread import BackgroundThread
import datetime
import requests
import threading
import time

app = Flask(__name__)

#firebase header
url = "https://web-automation-service-client.firebaseio.com/" #firebase db url (event queue)
messager = firebase.FirebaseApplication(url)

#Recieve time event (binding)
@app.route('/timeEvent', methods=['POST'])
def timeEvent():
    data = request.form.to_dict()
    if(request.method == 'POST'):
        event_id = data['elementEventId']
        eventTime = data['time']
        eventDate = data['date']
        payload = {"trigger_time": eventTime, "trigger_date":eventDate}
        #push to firebase event queue
        messager.put('TimeEvent', event_id, payload)
    #pack to JSON response
    response = jsonify({'status':'201'})
    response.status_code = 201
    return response

#Recieve meesage event (binding)
@app.route('/messageEvent', methods=['POST'])
def messageEvent():
    data = request.form.to_dict()
    if(request.method == 'POST'):
        messager.put('TimeEvent', data['eventDefination'])
    #pack to JSON response
    response = jsonify({'status':'201'})
    response.status_code = 201
    return response

if __name__ == '__main__':
    #ping firebase server to check time event (to trigger time event)
    worker = BackgroundThread(1, "PingFirebase", messager)
    worker.start()

    #start app (REST API)
    app.run(host='0.0.0.0', debug=True, threaded=True)
    