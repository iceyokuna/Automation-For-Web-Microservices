from MainModule.Graphflow.Core.Activity import *
from MainModule.Graphflow.Core.IOtypes import *

class ServiceTask(Activity):
    def __init__(self , id, name, inputInterface , outputInterface, lane_owner_id = None):
        super().__init__(id, name, inputInterface , outputInterface)
        self.HTMLReference = None
        self.preDefineInput = None
        self.serviceId =  None
        self.serviceMethodId =  None
        self.lane_owner_id = lane_owner_id
        self.type = "sync"

    def setAsync(self):
        self.type = "async"

    def isAsync(self):
        if(self.type == "async"):
            return True
        return False

    def setLaneOwner(self, lane_owner_id):
        self.lane_owner_id = lane_owner_id

    def getLaneOwner(self):
        return self.lane_owner_id

    def setPreDefineInput(self, preDefineInput):
        self.preDefineInput = preDefineInput
        #self.inputInterface
        #self.input

    def getPreDefineInput(self):
        return self.preDefineInput

    def setServiceReference(self,serviceId, serviceMethodId):
        self.serviceId = serviceId
        self.serviceMethodId = serviceMethodId
    
    def getServiceId(self):
        return self.serviceId
    
    def getServiceMethodId(self):
        return self.serviceMethodId

    def getHTML(self):
        return self.HTMLReference

    def setHTML(self, HTML_JSON_String):
        self.HTMLReference = HTML_JSON_String
