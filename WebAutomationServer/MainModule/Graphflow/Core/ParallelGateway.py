from MainModule.Graphflow.Core.Gateway import *
from MainModule.Graphflow.Core.IOtypes import *

class ParallelGateway(Gateway):
    def __init__(self , id, name, inputType , outputType):
        super().__init__(id, name, inputType , outputType)
        self.executed_list = [] #construct at run time
        self.inComingList = [] #construct at parsing time
        self.flowReferenceList = [] #construct at parsing time
    
    def addExecuted(self,elementId):
        self.executed_list.append(elementId)
    
    def isJoined(self):
        return self.inComingList == self.executed_list

    def addIncoming(self, elementId):
        self.inComingList.append(elementId)

    def addFlowReference(self, elementId):
        self.flowReferenceList.append(elementId)

    def getFlowReference(self):
        return self.flowReferenceList
