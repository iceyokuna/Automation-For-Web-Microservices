from flask import request
import threading
import time
import datetime
import requests

class BackgroundThread(threading.Thread):
    def __init__(self, threadID, name, time_db_ref):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.time_db_ref = time_db_ref

    def run(self):
        try:
            #fetch event every 3 second
            while(True):
                #fetching periodic time
                #time.sleep(3)
                #get time event from firebase
                time_event_data = self.time_db_ref.get()
                if(time_event_data == None):
                    continue
                #check and trigger event
                triggered_list = self.getTimeTriggered(time_event_data)
                self.triggerTimeEvent(triggered_list, time_event_data)
                ##debuging time event
                #print("pending time event !!")
                #print(time_event_data)
                #print("fetch time event successfully!!\n")
        except KeyboardInterrupt:
            print("Interrupted!")

    def getTimeTriggered(self, data):
        time_trigger_id_list = []
        #get local time
        localtime = time.localtime(time.time())
        day_local = localtime.tm_mday
        month_local = localtime.tm_mon
        year_local = localtime.tm_year
        hour_local = localtime.tm_hour
        minute_local =localtime.tm_min
        time_system = datetime.datetime(year_local, month_local, day_local, hour_local, minute_local)
        #check timeevent data in firebase
        for event in data:
            #extract time from event in firebase
            date_data = data[event]["trigger_date"].split('/')
            time_data = data[event]["trigger_time"].split(':')
            day_event= int(date_data[1])
            month_event = int(date_data[0])
            year_event = int(date_data[2])
            hour_event = int(time_data[0])
            minute_event =int(time_data[1])
            second_event =int(time_data[2])
            time_event = datetime.datetime(year_event, month_event, day_event, hour_event, minute_event,second_event)
            #check triggering
            if(time_system > time_event):
                time_trigger_id_list.append(event)
        #return list of element_id that are triggered
        return time_trigger_id_list

    def triggerTimeEvent(self, trigger_list, time_event_data):
        for event_id in trigger_list:
            workflowId = time_event_data[event_id]['workflowId']
            userId = time_event_data[event_id]['userId']
            #update workflow
            url = "http://127.0.0.1:8000/time_trigger/"
            result = requests.post(url , json = {"workflowId": workflowId, "userId":userId})
            print(result)
            #update state
            print("\n!!!!!!! trigger !!!!!!! ", event_id)
            #remove event from message queue
            self.time_db_ref.update({event_id:None})
