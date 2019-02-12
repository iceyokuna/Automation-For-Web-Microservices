from Core.Activity import *
from Core.IOtypes import *

class ServiceTask(Activity):
    def __init__(self , id, name, inputType , outputType, lane_owner_id = None):
        super().__init__(id, name, inputType , outputType)
        self.HTMLReference = None
        self.serviceURL=  None
        self.lane_owner_id = lane_owner_id

    def setLaneOwner(self, lane_owner_id):
        self.lane_owner_id = lane_owner_id

    def getLaneOwner(self):
        return self.lane_owner_id

    def setURL(self,url):
        self.serviceURL = url
    
    def getURL(self):
        return self.serviceURL

    def getHTML(self):
        return self.HTMLReference

    def setHTML(self, HTML_JSON_String):
        self.HTMLReference = HTML_JSON_String

    #perform service
    def perform(self):
        pass
