from flask import Flask, request, abort, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from datetime import date, timedelta
from BackgroundThread import BackgroundThread
import datetime
import requests
import threading
import time

app = Flask(__name__)

#firebase header
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred,{
    'databaseURL': 'https://web-automation-service-client.firebaseio.com/'
})

time_db_ref = db.reference('TimeEvent')
message_db_ref = db.reference('MessageEvent')

#Recieve time event (binding)
@app.route('/timeEvent', methods=['POST'])
def timeEvent():
    data = request.form.to_dict()
    if(request.method == 'POST'):
        event_id = data['elementEventId']
        eventTime = data['time']
        eventDate = data['date']
        workflowId = data['workflowId']
        userId = data['userId']
        payload = {"workflowId": workflowId, "userId": userId,
                   "trigger_time": eventTime, "trigger_date":eventDate}
        #push to firebase event queue
        time_db_ref.update({event_id:payload})
    #pack to JSON response
    response = jsonify({'status':'201'})
    response.status_code = 201
    return response

#Recieve meesage event (binding)
@app.route('/messageEvent', methods=['POST'])
def messageEvent():
    data = request.form.to_dict()
    if(request.method == 'POST'):
        pass
    #pack to JSON response
    response = jsonify({'status':'201'})
    response.status_code = 201
    return response

@app.route('/clear', methods=['POST'])
def messageEvent():
    data = request.form.to_dict()
    if(request.method == 'POST'):
        workflowId = data['workflowId']
        time_event_data = time_db_ref.get()
        for event in time_event_data:
            if(str(time_event_data[event][workflowId]) == str(workflowId)):
                time_db_ref.update({event:None})

    #pack to JSON response
    response = jsonify({'status':'201'})
    response.status_code = 201
    return response

if __name__ == '__main__':
    #ping firebase server to check time event (to trigger time event)
    worker = BackgroundThread(1, "PingFirebase", time_db_ref)
    worker.start()

    #start app (REST API)
    app.run(host='0.0.0.0', debug=True, threaded=True)
    