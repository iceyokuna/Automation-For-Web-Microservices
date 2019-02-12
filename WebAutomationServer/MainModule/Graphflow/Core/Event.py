from MainModule.Graphflow.Core.FlowObject import *
from MainModule.Graphflow.Core.IOtypes import *

class Event(FlowObject):
    def __init__(self , id, name, inputType , outputType):
        super().__init__(id, name, inputType , outputType)
        