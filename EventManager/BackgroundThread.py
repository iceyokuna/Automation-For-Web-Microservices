import threading
import time

class BackgroundThread(threading.Thread):
   def __init__(self, threadID, name):
       threading.Thread.__init__(self)
       self.threadID = threadID
       self.name = name

   def run(self):
       while(True):
           print("ping !!")
           time.sleep(3)