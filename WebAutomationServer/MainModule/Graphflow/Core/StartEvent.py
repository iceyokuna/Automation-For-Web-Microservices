from MainModule.Graphflow.Core.Event import *
from MainModule.Graphflow.Core.IOtypes import *

class StartEvent(Event):
    def __init__(self , id, name, inputType , outputType):
        super().__init__(id, name, inputType , outputType)