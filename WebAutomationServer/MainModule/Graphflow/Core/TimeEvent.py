from MainModule.Graphflow.Core.IntermediateEvent import *
from MainModule.Graphflow.Core.IOtypes import *
import datetime

class TimeEvent(IntermediateEvent):
    def __init__(self , id, name, inputType , outputType, eventDefination):
        super().__init__(id, name, inputType , outputType)
        self.eventDefination = eventDefination
        self.date = None
        self.time = None
        self.countdown = None
        self.status = "none"
        self.type = "none"

    def trigger(self):
        self.status = "triggered"

    def pending(self):
        self.status = "pending"

    def isTriggered(self):
        if(self.status == "triggered"):
            return True
        return False
    
    def isPending(self):
        if(self.status == "pending"):
            return True
        return False

    def setCountDownType(self):
        self.type = "countdown"

    def setDateTimeType(self):
        self.type = "datetime"

    def setTimeEvent(self, date, time):
        self.date = date
        self.time = time

    def setCountDown(self, countdown):
        self.countdown = countdown

    def getTriggerDate(self):
        #check type of event
        if(self.type == "countdown"):
            days = int(self.countdown['days'])
            hours = int(self.countdown['hours'])
            minutes = int(self.countdown['minutes'])
            seconds = int(self.countdown['seconds'])
            deltaTime = datetime.timedelta(days=days, hours =hours, minutes = minutes, seconds = seconds)
            now = datetime.datetime.now()
            result = now + deltaTime
            date = str(result.month) + '/' + str(result.day) + '/' + str(result.year)
            return date
        return self.date

    def getTriggerTime(self):
        #check type of event
        if(self.type == "countdown"):
            days = int(self.countdown['days'])
            hours = int(self.countdown['hours'])
            minutes = int(self.countdown['minutes'])
            seconds = int(self.countdown['seconds'])
            deltaTime = datetime.timedelta(days=days, hours =hours, minutes = minutes, seconds = seconds)
            now = datetime.datetime.now()
            result = now + deltaTime
            time = str(result.hour) + ':' + str(result.minute) + ':' + str(result.second)
            return time
        return self.time

    def setEventDefination(self, defination):
        self.eventDefination = defination

    def getEventDefination(self):
        return self.eventDefination

    def setDefination(self, eventDefination):
        self.eventDefination = eventDefination

    def getDefination(self):
        return self.eventDefination
