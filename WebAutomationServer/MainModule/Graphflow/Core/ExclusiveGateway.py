from MainModule.Graphflow.Core.Gateway import *
from MainModule.Graphflow.Core.IOtypes import *

class ExclusiveGateway(Gateway):
    def __init__(self , id, name, inputType , outputType):
        super().__init__(id, name, inputType , outputType)
        self.flowReferenceList = []
        self.condition = None

    def addFlowReference(self, elementId):
        self.flowReferenceList.append(elementId)
    
    def setCondition(self, conditionRef):
        self.condition = conditionRef

    def getRequiredTasks(self):
        required_task = []
        if(self.condition is None):
            return []
        for condition in self.condition:
            required_task.append(condition['variable1']['variableOf']['methodOfTaskId'])
        return required_task

    #return flow that make condition true
    def getFlowReference(self, required_task):
        required_task_dict = required_task
        if(self.condition is None):
            return self.flowReferenceList[0]

        for condition in self.condition:
            if(condition['operator'] == "=="):
                var1Task_object = required_task_dict[condition['variable1']['variableOf']['methodOfTaskId']]
                var1_value = var1Task_object.getInput()[condition['variable1']['name']]['value']
                var2_value = condition['variable2']['value']
                if(var1_value == var2_value):
                    return condition['targetNode']    

        return self.flowReferenceList[0] #fail to getflow return None (self.flowReferenceList[0] for debuging)
