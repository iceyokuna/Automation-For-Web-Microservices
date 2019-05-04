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
           while(True):
               time_event_data = self.messager.get("TimeEvent",None)
               print(time_event_data)
               print("fetch time event successfully!!\n")
               time.sleep(10)
       except KeyboardInterrupt:
           print("Interrupted!")
