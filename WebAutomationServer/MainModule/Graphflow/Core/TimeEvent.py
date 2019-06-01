from MainModule.Graphflow.Core.IntermediateEvent import *
from MainModule.Graphflow.Core.IOtypes import *

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

    def getTriggerDate(self):
        return self.date

    def getTriggerTime(self):
        return self.time

    def setEventDefination(self, defination):
        self.eventDefination = defination

    def getEventDefination(self):
        return self.eventDefination

    def setDefination(self, eventDefination):
        self.eventDefination = eventDefination

    def getDefination(self):
        return self.eventDefination
