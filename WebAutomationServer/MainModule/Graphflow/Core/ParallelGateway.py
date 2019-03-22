from MainModule.Graphflow.Core.Gateway import *
from MainModule.Graphflow.Core.IOtypes import *

class ParallelGateway(Gateway):
    def __init__(self , id, name, inputType , outputType):
        super().__init__(id, name, inputType , outputType)
