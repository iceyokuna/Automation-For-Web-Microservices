from MainModule.Graphflow.Core.IntermediateEvent import *
from MainModule.Graphflow.Core.IOtypes import *

class TimeEvent(IntermediateEvent):
    def __init__(self , id, name, inputType , outputType, eventDefination):
        super().__init__(id, name, inputType , outputType)
        self.eventDefination = eventDefination
    
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
