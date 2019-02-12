from MainModule.Graphflow.Core.Activity import *
from MainModule.Graphflow.Core.IOtypes import *

class UserTask(Activity):
    def __init__(self , id, name, inputType , outputType):
        super().__init__(id, name, inputType , outputType)
        self.HTMLReference = None

    def setHTML(self, html):
        self.HTMLReference =  html

    def getHTML(self):
        pass
