from MainModule.Graphflow.Core.CoreElement import *
from MainModule.Graphflow.Core.IOtypes import *

class FlowObject(CoreElement):
    def __init__(self , id, name, inputInterface , outputInterface):
        super().__init__(id, name)
        self.inputInterface = inputInterface
        self.outputInterface = outputInterface
        self.input = None
        self.output = None
        self.flowReference = None

    def setInputInterface(self, inputInterface):
        self.inputInterface = inputInterface

    def setOutputInterface(self, outputInterface):
        self.outputInterface = outputInterface

    def getInputInterface(self):
        return self.inputInterface

    def getOutputInterface(self):
        return self.outputInterface

    def setInput(self, Input):
        self.input = Input

    def getInput(self):
        return self.input

    def setOutput(self, output):
        self.output = output

    def getOutput(self):
        return self.output

    def setFlowReference(self, flow):
        self.flowReference = flow

    def getFlowReference(self):
        return self.flowReference