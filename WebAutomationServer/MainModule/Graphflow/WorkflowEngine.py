from MainModule.Graphflow.Core.ServiceTask import ServiceTask
from MainModule.Graphflow.Core.UserTask import UserTask
from MainModule.Graphflow.Core.StartEvent import StartEvent
from MainModule.Graphflow.Core.EndEvent import EndEvent
from MainModule.Graphflow.Core.ExclusiveGateway import ExclusiveGateway
from MainModule.Graphflow.Core.ParallelGateway import ParallelGateway
from MainModule.Graphflow.Core.SequenceFlow import SequenceFlow
from MainModule.Graphflow.Core.TimeEvent import TimeEvent
from MainModule.Graphflow.Core.IOtypes import *
import pickle
import requests
import threading

class WorkflowEngine:
    def __init__(self):
        self.state = {} #Q
        self.currentState = {"previous":None,"current":None} #S (dict because need to set previous(future feature) and current)
        self.endState = {} #E
        self.transition = {} #delta

    #parsing workflow
    def initialize(self, elements_list, HTML_list = None, service_list = None, preInput_list = None, condition_list = None, timer_list = None):
        element_ref_lane_owner = {}
        sequenceFlow_ref = []

        #token lane
        for element in elements_list:
            if(element['name'] == 'bpmn2:laneSet'):
                element = element['elements']
                for lane in element:
                    elements_in_lane = lane['elements']
                    for element_ref in elements_in_lane:
                        element_ref = element_ref['elements'][0]
                        element_ref_lane_owner[element_ref['text']] = str(lane['attributes']['name']) #bpmn_element_id : id_lane_owner

            #Start Event
            elif(element['name'] == 'bpmn2:startEvent'):
                Id = element['attributes']['id']
                name = element['attributes']['name']
                start_event = StartEvent(Id, name, None, None)
                self.state[element['attributes']['id']] = start_event
                self.currentState["current"] = element['attributes']['id']

            #End Event
            elif(element['name'] == 'bpmn2:endEvent'):
                Id = element['attributes']['id']
                name = element['attributes']['name']
                end_event = EndEvent(Id, name, None, None)
                self.state[element['attributes']['id']] = end_event
                self.endState[element['attributes']['id']] = element['attributes']['name']

            #Task
            elif(element['name'] == 'bpmn2:task'):
                lane_owner = element_ref_lane_owner[element['attributes']['id']]
                Id = element['attributes']['id']
                name = element['attributes']['name']
                inputType = None
                outputType = None
                task = ServiceTask(Id, name, inputType, outputType, lane_owner)
                self.state[element['attributes']['id']] = task

            #Sequecial Flow
            elif(element['name'] == 'bpmn2:sequenceFlow'):
                sequenceFlow_ref.append(element['attributes'])

            #Intermediate Time Event
            elif(element['name'] == 'bpmn2:intermediateCatchEvent'):
                Id = element['attributes']['id']
                name = element['attributes']['name']
                inputType = None
                outputType = None
                eventDefination = element['elements'][2]['name']
                event = TimeEvent(Id, name, inputType, outputType, eventDefination)
                self.state[element['attributes']['id']] = event

            #Parallel GateWay
            elif(element['name'] == 'bpmn2:parallelGateway'):
                Id = element['attributes']['id']
                name = "ParallelGateway"
                inputType = None
                outputType = None
                gateway = ParallelGateway(Id, name, inputType, outputType)
                self.state[element['attributes']['id']] = gateway
            
            #Exclusive Gateway
            elif(element['name'] == 'bpmn2:exclusiveGateway'):
                Id = element['attributes']['id']
                name = "ExclusiveGateway"
                inputType = None
                outputType = None
                gateway = ExclusiveGateway(Id, name, inputType, outputType)
                self.state[element['attributes']['id']] = gateway

        #bind service and setup bpmn
        self.bindHTMLForm(HTML_list)
        self.bindService(service_list)
        self.setPreDefindInput(preInput_list)
        self.setCondition(condition_list)
        self.createTransition(sequenceFlow_ref)
        self.setTimer(timer_list)

    #construct state transition function
    def createTransition(self, transition_list):
        for transition in transition_list:
            #case diverging parallel
            if(isinstance(self.state[transition['sourceRef']],ParallelGateway)):
                parallel_gateway_object = self.state[transition['sourceRef']]
                parallel_gateway_object.addFlowReference(transition['targetRef'])
                self.transition[(transition['sourceRef'],transition['targetRef'])] = transition['targetRef']
            #case converging parallel
            elif(isinstance(self.state[transition['targetRef']],ParallelGateway)):
                parallel_gateway_object = self.state[transition['targetRef']]
                parallel_gateway_object.addIncoming(transition['sourceRef'])
                self.transition[(transition['sourceRef'],"done")] = transition['targetRef']

            #case gateway condition
            if(isinstance(self.state[transition['sourceRef']],ExclusiveGateway)):
                exclusive_gateway_object = self.state[transition['sourceRef']]
                exclusive_gateway_object.addFlowReference(transition['targetRef'])
                self.transition[(transition['sourceRef'],transition['targetRef'])] = transition['targetRef']

            #Other case eg. tast, event, .....
            else:
                self.transition[(transition['sourceRef'],"done")] = transition['targetRef']

    #bind HTML form to each task
    def bindHTMLForm(self, HTML_list):
        if(HTML_list is None):
            return
        for form in HTML_list:
            task = self.state[form['taskId']]
            html = form['forms']['inputForm']
            task.setHTML(html)

    #bind service and serviceInterface to each task
    def bindService(self, service_list):
        if(service_list is None):
            return
        for service in service_list:
            task = self.state[service]
            #extract service's data from json serviceList
            serviceId = service_list[service]['serviceId']
            methodId = service_list[service]['method']['id']
            serviceInputInterface = service_list[service]['method']['input_interface']
            serviceOutputInterface = service_list[service]['method']['output_interface']
            #bind to task
            task.setServiceReference(serviceId, methodId)
            task.setInputInterface(serviceInputInterface)
            task.setOutputInterface(serviceOutputInterface)

    #setup timer to event
    def setTimer(self, timer_list):
        for timer in timer_list:
            date = timer['targetDate']
            time = timer['targetTime']
            event = self.state[timer]
            event.setTimeEvent(date, time)

    #setup condition to gateway
    def setCondition(self, condition_list):
        for condition_ref in condition_list:
            exclusive_gateway = self.state[condition_ref]
            exclusive_gateway.setCondition(condition_list[condition_ref]) #set condition list

    #set pre-input to task, And bind to input
    def setPreDefindInput(self, predefine_input_list):
        if(predefine_input_list is None):
            return
        for preinput_task in predefine_input_list:
            task = self.state[preinput_task]
            preinput = predefine_input_list[preinput_task]['preInputs']
            task.setPreDefineInput(preinput)
            Input = {}
            for value in preinput:
                Input[value['variableName']] = {'value': value['value']}
            #set as a input to task
            task.setInput(Input)

        
    #message from client input (run time)
    def next(self, message , status = "done"):
        #get object from current execution
        element_object = None
        if(message['taskId'] == None):
            element_object = self.state[self.currentState["current"]]
        else:
            #execute task, if message[taskId] is task object
            if(isinstance(self.state[message['taskId']], ServiceTask)):
                self.execute(message)
            #update state (for parallel change element_object to get from message)
            self.currentState["current"] = self.transition[(message['taskId'], status)]
            element_object = self.state[self.currentState["current"]]

        #start case
        if(isinstance(element_object, StartEvent)):
            return self.next({'formInputValues': None, 'taskId': element_object.getId()})

        #Task case
        if(isinstance(element_object, ServiceTask)):
            if(element_object.getHTML() is None):
                #no html form
                return self.next({'formInputValues': element_object.getInput(), 'taskId': element_object.getId()})
            else:
                #have html form
                return ({"HTML":element_object.getHTML(), "taskId":element_object.getId()})

        #TimeEvent case (Intermidiate)
        if(isinstance(element_object, TimeEvent)):
            eventDefination = element_object.getEventDefination()
            

        #exclusive gateway case
        if(isinstance(element_object, ExclusiveGateway)):
            #get required task that need to check condition
            required_task = element_object.getRequiredTasks()
            required_task_dict = {}
            for task in required_task:
                required_task_dict[task] = self.state[task]
            #get flow refernece that make condition true
            flow_ref = element_object.getFlowReference(required_task_dict)
            return self.next({'formInputValues': None, 'taskId': element_object.getId()}, flow_ref)

        #parallel gateway case
        if(isinstance(element_object, ParallelGateway)):
            element_object.addExecuted(message['taskId'])
            #reach convering parallel object
            if(len(element_object.getFlowReference()) == 1):
                #base case parallel is done, then update state and return to kill thread
                if(element_object.isJoined()):
                    #update currentState to converging gateway
                    self.currentState["current"] = element_object.getId()
                    return
                #base case is still not done, then return to kill thread
                else:
                    return
            #start parallel execution
            elif(len(element_object.getFlowReference()) != 1):
                flow_reference_list = element_object.getFlowReference()
                for flow in flow_reference_list:
                    thread = threading.Thread(target=self.next({'formInputValues': None, 'taskId': element_object.getId()}, flow))
                    thread.start()
                    thread.join()
                converging_gateway = self.state[self.currentState["current"]]
                return self.next({'formInputValues': None, 'taskId': self.currentState["current"]}, converging_gateway.getFlowReference()[0])

        #End case
        if(self.currentState["current"] in self.endState):
            return {"HTML":"DONE", "taskId":element_object.getId()}

        return  {"HTML":"FAILED", "taskId":element_object.getId()}

    #execute send request to service manager
    def execute(self, message):
        element_object = self.state[message['taskId']]

        #show for debuging
        element_object.setInput(message['formInputValues'])
        print("execute")
        print(element_object.getId())
        print(message['formInputValues'])
        print()

        #call service to API gateway (service manager)
        #url_api_gateway = "http://178.128.214.101:8004/api/call_service"
        #request_data = message['formInputValues']
        #service_id = element_object.getServiceId()
        #method_id = element_object.getServiceId()
        #request_input = {"service_id":service_id, "method_id":method_id, "input":request_data}
        #requests.post(url_api_gateway, json= request_input)
        '''
        #Use to debug (call without API gateway [without calling service manager])
        if(str(element_object.getServiceId()) == "1"):
            email = message['formInputValues']['email']['value']
            subject = message['formInputValues']['subject']['value']
            message_data = message['formInputValues']['message']['value']

            request_input = {"receiver":[email],"emailBody":message_data,"emailTitle":subject}
            requests.post('http://127.0.0.1:8001/api/email', json= request_input)

        elif(str(element_object.getServiceId()) == "5"):
            url = "https://safe-beyond-22181.herokuapp.com/notify"
            user_id = message['formInputValues']['user_id']['value']
            message_data = message['formInputValues']['message']['value']
            request_data = {"user_id":user_id, "message":message_data}
            requests.get(url , data= request_data)
        '''

    def update(self):
        pass

    #use to show all finite state machine formal defination
    def showDefination(self):
        print()
        print("STATE (Q) -> " + str(self.state) + "\n")
        print("Current Execution -> " + str(self.currentState) + "\n")
        print("END STATE -> " + str(self.endState) + "\n")
        print("TRANSITION FUNCTION ->  " + str(self.transition) + "\n")
        print()


