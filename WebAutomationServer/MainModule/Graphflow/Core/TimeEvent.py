from MainModule.Graphflow.Core.IntermediateEvent import *
from MainModule.Graphflow.Core.IOtypes import *

class TimeEvent(IntermediateEvent):
    def __init__(self , id, name, inputType , outputType, eventDefination):
        super().__init__(id, name, inputType , outputType)
        self.eventDefination = eventDefination
        self.date = None
        self.time = None

    def setTimeEvent(self, date, time):
        self.date = date
        self.time = time

    def setEventDefination(self, defination):
        self.eventDefination = defination
    
    def initiate(self):
        pass

    def setDefination(self, eventDefination):
        self.eventDefination = eventDefination

    def getDefination(self):
        return self.eventDefination

    def isReady(self):
        pass

    def getRemainingTime(self):
        pass
