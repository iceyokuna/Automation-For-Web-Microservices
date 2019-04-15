from MainModule.Graphflow.Core.IOtypes import *

class CoreElement:
    def __init__(self, elementId, elementName):
        self.id = elementId
        self.name = elementName

    def getId(self):
        return self.id
    
    def getName(self):
        return self.name
        
    def __str__(self):
        return str(self.id) + " " + str(self.name)