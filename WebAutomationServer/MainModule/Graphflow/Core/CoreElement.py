from Core.IOtypes import *

class CoreElement:
    def __init__(self, elementId, elementName):
        self.id = elementId
        self.name = elementName
        
    def __str__(self):
        return str(self.id) + " " + str(self.name)