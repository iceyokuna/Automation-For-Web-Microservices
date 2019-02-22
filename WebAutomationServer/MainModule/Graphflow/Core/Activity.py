from MainModule.Graphflow.Core.FlowObject import *
from MainModule.Graphflow.Core.IOtypes import *

class Activity(FlowObject):
    def __init__(self , id, name, inputInterface , outputInterface):
        super().__init__(id, name, inputInterface , outputInterface)
