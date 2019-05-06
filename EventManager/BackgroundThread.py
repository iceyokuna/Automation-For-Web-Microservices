from flask import request
import threading
import time

class BackgroundThread(threading.Thread):
    def __init__(self, threadID, name, messager):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.messager = messager

    def run(self):
        try:
            #fetch event every 10 second
            while(True):
                time.sleep(10)
                time_event_data = self.messager.get("TimeEvent",None)
                #check and trigger event

                print(time_event_data)
                print("fetch time event successfully!!\n")
        except KeyboardInterrupt:
            print("Interrupted!")

    def getTimeTriggered(self, data):
        time_trigger_id_list = []

        localtime = time.localtime(time.time())
        day = localtime.tm_mday
        month = localtime.tm_mon
        year = localtime.tm_year
        hour = localtime.tm_hour
        minute =localtime.tm_min
        for event in data:
            pass


    def triggerTimeEvent(self, data):
        pass
