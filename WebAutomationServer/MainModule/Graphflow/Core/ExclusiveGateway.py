from MainModule.Graphflow.Core.Gateway import *
from MainModule.Graphflow.Core.IOtypes import *

class ExclusiveGateway(Gateway):
    def __init__(self , id, name, inputType , outputType):
        super().__init__(id, name, inputType , outputType)
        self.flowReferenceList = []
        self.condition = None
    
    def setCondition(self, conditionRef):
        self.condition = conditionRef

    def calculateCondition(self):
        pass

    #Overiding 
    def getFlowReference(self):
        if(self.condition is None):
            return self.flowReferenceList[0]
        return self.calculateCondition()
