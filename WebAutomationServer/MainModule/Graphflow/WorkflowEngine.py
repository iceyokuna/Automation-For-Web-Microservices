from MainModule.Graphflow.Core.ServiceTask import ServiceTask
from MainModule.Graphflow.Core.UserTask import UserTask
from MainModule.Graphflow.Core.StartEvent import StartEvent
from MainModule.Graphflow.Core.EndEvent import EndEvent
from MainModule.Graphflow.Core.ExclusiveGateway import ExclusiveGateway
from MainModule.Graphflow.Core.SequenceFlow import SequenceFlow
from MainModule.Graphflow.Core.TimeEvent import TimeEvent
from MainModule.Graphflow.Core.IOtypes import *
import pickle
import requests

class WorkflowEngine:
    def __init__(self):
        self.state = {} #Q
        self.transition = {} #delta
        self.currentState = {"previous":None,"current":None} #S (dict because need to set previous(future feature) and current)
        self.endState = {} #E

    def initialize(self, elements_list, HTML_list = None):
        
        element_ref_lane_owner = {}
        element_ref_html = {}

        #token html
        for html in HTML_list:
            element_ref_html[html['taskId']] = html['formData']

        #token lane
        for element in elements_list:
            if(element['name'] == 'bpmn2:laneSet'):
                element = element['elements']
                for lane in element:
                    elements_in_lane = lane['elements']
                    for element_ref in elements_in_lane:
                        element_ref = element_ref['elements'][0]
                        element_ref_lane_owner[element_ref['text']] = str(lane['attributes']['name']) #id_element : id_owner

            #Start Event
            elif(element['name'] == 'bpmn2:startEvent'):
                self.currentState["current"] = element['attributes']['id']

            #End Event
            elif(element['name'] == 'bpmn2:endEvent'):
                self.endState[element['attributes']['id']] = element['attributes']['name']

            #Tasks
            elif(element['name'] == 'bpmn2:task'):
                lane_owner = element_ref_lane_owner[element['attributes']['id']]
                Id = element['attributes']['id']
                name = element['attributes']['name']
                inputType = None
                outputType = None
                task = ServiceTask(Id, name, inputType, outputType, lane_owner)
                task.setHTML(element_ref_html[element['attributes']['id']])
                self.state[element['attributes']['id']] = task

            #Flows
            elif(element['name'] == 'bpmn2:sequenceFlow'):
                self.transition[(element['attributes']['sourceRef'],"")] = element['attributes']['targetRef']

            #Intermediate Event
            elif(element['name'] == 'bpmn2:intermediateCatchEvent'):
                Id = element['attributes']['id']
                name = element['attributes']['name']
                inputType = None
                outputType = None
                eventDefination = element['elements'][2]['name']
                event = TimeEvent(Id, name, inputType, outputType, eventDefination)
                self.state[element['attributes']['id']] = event

            #Parallel
            elif(element['name'] == 'bpmn2.parallelGateway'):
                Id = element['attributes']['id']
                name = element['attributes']['name']
                inputType = None
                outputType = None
                gateway = ParallelGateway(Id, name, inputType, outputType)
                self.state[element['attributes']['id']] = gateway
    

    def start(self):
        self.currentState["current"] = self.transition[(self.currentState["current"],"")]
        element_object = self.state[self.currentState["current"]]
        return (element_object.getHTML())
        
    def next(self):
        #get object from next transition
        self.currentState["current"] = self.transition[(self.currentState["current"],"")]

        #check that is end state or not
        if(self.currentState["current"] in self.endState):
            #DEBUG_LOG_WHEN_EXECUTION_DONE
            self.showLog()
            return "DONE"
        
        #Tasks case return HTML and perform services (2 cases have/not have form)
        element_object = self.state[self.currentState["current"]]

        return (element_object.getHTML())

    def setUserInput(self, userInput):
        self.state[self.currentState["current"]].setInput(userInput)
        if (self.state[self.currentState["current"]].getInputInterface() == None):
            return

        # request to server
        '''
        request_input = {}
        for key in userInput:
            if(key == 'email'):
                request_input[key] = [userInput[key]['value']]
                continue
            request_input[key] = userInput[key]['value']

        data = request_input
        res = requests.post('http://127.0.0.1:8001/api/email', json= data)
        '''


    def setServiceOutput(self, serviceOutput):
        self.state[self.currentState["current"]].setOutput(serviceOutput)

    def execute(self):
        #request and get respond back and store to self.output
#        ServiceOutput = request......
#        self.currentState["current"].setServiceOutput(ServiceOutput)

        #Test exectuion before deployment (calling local host email service)
        outputInterface = self.state[self.currentState["current"]].getOutputInterface()
        userInput = self.state[self.currentState["current"]].getInput()
        request_input = {}
        for key in userInput:
            request_input[key] = key['value']
        print(request_input)
        
    
    def bindService(self, serviceList):
        for service in serviceList:
            service_data = serviceList[service]
            # self.state[service].setURL(service_data['method']['url'])
            self.state[service].setInputInterface(service_data['method']['input_interface'])
            self.state[service].setOutputInterface(service_data['method']['output_interface'])
#            print(self.state[service].getURL())
#            print(self.state[service].getInputInterface())
#            print(self.state[service].getOutInterface())
#            print()

    #use to debug when execution reach end node
    def showLog(self):
        for element in self.state:
            print()
            print("-----------------------------------")
            print("TASK ID -> " + str(element))
            print("Service URL -> " + str(self.state[element].getURL()))
            print("Service Interface -> " + str(self.state[element].getInputInterface()))
            print("User Input -> " + str(self.state[element].getInput()))
            print("-----------------------------------")

    #use to show all finite state machine formal defination
    def showDefination(self):
        print()
        print("STATE (Q) -> " + str(self.state) + "\n")
        print("Current Execution -> " + str(self.currentState) + "\n")
        print("END STATE -> " + str(self.endState) + "\n")
        print("TRANSITION FUNCTION ->  " + str(self.transition) + "\n")
        print()


