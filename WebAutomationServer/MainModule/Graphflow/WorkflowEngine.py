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
import datetime
import time

class WorkflowEngine:
    def __init__(self):
        #finite state machine attributes
        self.state = {} #Q
        self.currentState = {"previous":None,"current":None} #S (dict because need to set previous(future feature) and current)
        self.endState = {} #E
        self.transition = {} #delta
        
        #workflow infomation
        self.workflowId = None
        self.workflowName = None
        self.executed = []
        self.collaborator = set()
        self.unjoinStateId = [] #use to mark unjoin state
    #parsing workflow
    def initialize(self, id, name, elements_list, HTML_list = None, service_list = None, preInput_list = None, condition_list = None, timer_list = None):
        self.workflowId = id
        self.workflowName = name

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
                        self.collaborator.add(str(lane['attributes']['name']))
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

            #Time Event
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
        print('-=-=--=-=-=-=--=-=-=-=')
        print(self.collaborator)

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
        print(timer_list)
        for timer in timer_list:
            try:
                days = timer_list[timer]['days']
                hours = timer_list[timer]['hours']
                minutes = timer_list[timer]['minutes']
                seconds = timer_list[timer]['seconds']
                event = self.state[timer]
                event.setCountDownType()
                event.setCountDown({"days":days, "hours":hours, "minutes":minutes, "seconds":seconds})
            except:
                date = timer_list[timer]['targetDate']
                time = timer_list[timer]['targetTime'] + ":00"
                event = self.state[timer]
                event.setDateTimeType()
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
    def next(self, message , user_name, status = "done"):
        #get object from current execution
        element_object = None
        if(message['taskId'] == None):
            element_object = self.state[self.currentState["current"]]
        else:
            #execute task, if message[taskId] is task object
            if(isinstance(self.state[message['taskId']], ServiceTask)):
                self.execute(message)

            #update state (for parallel change element_object to get from message)
            #send execution notification detail
            executedBy = self.state[self.currentState["current"]].getId()
            executedTaskName = self.state[self.currentState["current"]].getName()
            localtime = time.localtime(time.time())
            execute_date = str(localtime.tm_mday) + "/" + str(localtime.tm_mon) + "/" + str(localtime.tm_year)
            execute_time = str(localtime.tm_hour) + ":" + str(localtime.tm_min)
            executed_data = {"elementId": self.currentState["current"],"elementName": executedTaskName, "executedDate":execute_date, "executedTime":execute_time, "executedBy": "iceyo"}
            self.executed.insert(0,executed_data)

            #update state using state trainsition
            self.currentState["current"] = self.transition[(message['taskId'], status)]
            element_object = self.state[self.currentState["current"]]

            #send notification to all collaborator
            self.sendNotification(executedBy, executedTaskName)
        
        #start case
        if(isinstance(element_object, StartEvent)):
            return self.next({'formInputValues': None, 'taskId': element_object.getId()}, user_name)

        #Task case
        if(isinstance(element_object, ServiceTask)):
            #check execution permission (lane owner)
            try:
                if(user_name != self.state[self.currentState["current"]].getLaneOwner()):
                    print(user_name)
                    print(self.currentState["current"])
                    currentObject = self.state[self.currentState["current"]]
                    self.notifyLane(currentObject.getId(),currentObject.getName(), currentObject.getLaneOwner())
                    return {"HTML":"WAIT_LANE", "taskId":self.currentState["current"]}
            except:
                pass
            if(element_object.getHTML() is None):
                #no html form
                return self.next({'formInputValues': element_object.getInput(), 'taskId': element_object.getId()}, user_name)
            else:
                #have html form
                if(str(element_object.getServiceId()) == "51"):
                    print("Google Form Service !!")
                    return ({"HTML":element_object.getHTML(), "taskId":element_object.getId(), "serviceProvider":"google"})
                return ({"HTML":element_object.getHTML(), "taskId":element_object.getId(), "serviceProvider": None})

        #TimeEvent case (Intermidiate)
        if(isinstance(element_object, TimeEvent)):
            #check triggered first
            if(element_object.isTriggered()):
                return self.next({'formInputValues': None, 'taskId': element_object.getId()}, user_name)
            if(element_object.isPending()):
                return ({"HTML": "WAIT_TIME", "taskId":element_object.getId()})
            eventDefination = element_object.getEventDefination()
            #push event to event queue using cloud service
            url = "http://127.0.0.1:5000/timeEvent"
            payload = {"elementEventId": element_object.getId(),
                       "time":element_object.getTriggerTime(),
                       "date":element_object.getTriggerDate(),
                       "workflowId": self.workflowId,
                       "userId": user_name}
            result = requests.post(url , data=payload)
            element_object.pending()
            self.state[self.currentState["current"]] = element_object
            return ({"HTML": "WAIT_TIME", "taskId":element_object.getId()})          

        #exclusive gateway case
        if(isinstance(element_object, ExclusiveGateway)):
            #get required task that need to check condition
            required_task = element_object.getRequiredTasks()
            required_task_dict = {}
            for task in required_task:
                required_task_dict[task] = self.state[task]
            #get flow refernece that make condition true
            flow_ref = element_object.getFlowReference(required_task_dict)
            return self.next({'formInputValues': None, 'taskId': element_object.getId()},user_name, flow_ref)

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
                    thread = threading.Thread(target=self.next({'formInputValues': None, 'taskId': element_object.getId()},user_name, flow))
                    thread.start()
                    thread.join()
                converging_gateway = self.state[self.currentState["current"]]
                return self.next({'formInputValues': None, 'taskId': self.currentState["current"]}, user_name, converging_gateway.getFlowReference()[0])

        #End case
        if(self.currentState["current"] in self.endState):
            return {"HTML":"DONE", "taskId":element_object.getId()}
        return  {"HTML":"<div>FAILED</div>", "taskId":element_object.getId()}

    #execute send request to service manager
    def execute(self, message):
        element_object = self.state[message['taskId']]

        #show for debuging
        element_object.setInput(message['formInputValues'])
        print("execute")
        print("by " + str(element_object.getLaneOwner()))
        print(element_object.getId())
        print(element_object.getInput())
        print()
        print("service id :",end ="  ")
        print(str(element_object.getServiceId()),end ="  ")
        print(str(element_object.getServiceMethodId()))

        #call gateway API to execute service
        self.callService(message, str(element_object.getServiceId()), str(element_object.getServiceMethodId()))

    def sendNotification(self, executeBy , executeTaskName):
        title =  "Iceyo " + " update '" + str(self.workflowName) + "'\n(" + executeTaskName +")"
        body = "workflow"
        click_action = "none"
        payload = {'type':'WORKFLOW_STATUS',
        'workflow_id': self.workflowId,
        'workflow_name': self.workflowName,
        'executedItems':self.executed,
        'currentElement': {'elementId':self.currentState["current"], "elementName": self.state[self.currentState["current"]].getName()}}

        #remove executed not unjoin
        for i in range (len(self.executed)):
            elementId = self.executed[i]['elementId']
            if(isinstance(self.state[elementId], ParallelGateway) and (not self.state[elementId].isJoined())):
                self.executed.pop(i)
                break

        #current execution not unjoin
        if(isinstance(self.state[self.currentState["current"]], ParallelGateway) and (len(self.state[self.currentState["current"]].getFlowReference()) == 1) and (not self.state[self.currentState["current"]].isJoined())):
            return

        for colloaborator in list(self.collaborator):
            url = "http://178.128.214.101:8003/api/send_notification/"
            data = {'title':title, 'body':body,'click_action':click_action,
            'data': payload,'to': [colloaborator]}
            headers = {'Content-type': 'application/json'}
            result = requests.post(url , json = data, headers = headers)
            print("Send notification: " + str(result))
            #update log to database
            self.updateLog(data)

    def notifyLane(self, taskId, taskName, target):
        localtime = time.localtime(time.time())
        execute_date = str(localtime.tm_mday) + "/" + str(localtime.tm_mon) + "/" + str(localtime.tm_year)
        execute_time = str(localtime.tm_hour) + ":" + str(localtime.tm_min)

        title = "[" + self.workflowName + "]" + "You task is ready"
        body = "Task :" + taskName + " is your responsibility"

        payload = {'type':'YOUR_TURN',
                   'title': title,
                   'body': body,
                   'workflowId': self.workflowId,
                   'taskName': taskName,
                   'taskId': taskId,
                   'executedDate': execute_date,
                   'executedTime': execute_time}

        url = "http://178.128.214.101:8003/api/send_notification/"
        data = {'title':title, 'body':body,'click_action':"none",
        'data': payload,'to': [target]}
        headers = {'Content-type': 'application/json'}
        result = requests.post(url , json = data, headers = headers)
        print(data)
        print("Send notification (lane changed): " + str(result))

        #save notification
        url = "http://178.128.214.101:8003/api/notification/"
        data = {'data': payload}
        headers = {'Content-type': 'application/json'}
        result = requests.post(url , json = data, headers = headers)
        print(data)
        print("Save notification (lane changed): " + str(result))

    #update log of workflow to service manager
    def updateLog(self, data):
        url = "http://178.128.214.101:8003/api/log/" + str(self.workflowId)
        headers = {'Content-type': 'application/json'}
        payload  = {"logs": data}
        result = requests.put(url , json = payload, headers = headers)
        print("Update log: " + str(result))

    #update workflow state -> next state from state transition
    def TimerUpdateState(self ,user_id):
        print("workflow engine updating from time triggered")
        element_object = self.state[self.currentState["current"]]
        element_object.trigger()
        self.state[self.currentState["current"]] = element_object
        self.next({'formInputValues': None, 'taskId': None}, user_id)

    def getPreview(self, taskId):
        element_object = self.state[taskId]
        form = element_object.getHTML()
        inputValue = element_object.getInput()
        return {'HTML':form, 'formInputValues': inputValue}

    #use to show all finite state machine formal defination
    def showDefination(self):
        print()
        print("STATE (Q) -> " + str(self.state) + "\n")
        print("Current Execution -> " + str(self.currentState) + "\n")
        print("END STATE -> " + str(self.endState) + "\n")
        print("TRANSITION FUNCTION ->  " + str(self.transition) + "\n")
        print()

    def callService(self ,message ,service_id ,service_method):
        try:
            #test philips hue
            if(str(service_id) == "74"):
                if(str(service_method) == "84"):
                    url = "http://127.0.0.1:5002/turnon"
                    requests.post(url , data= {})
                elif(str(service_method) == "85"):
                    url = "http://127.0.0.1:5002/turnoff"
                    requests.post(url , data= {})
                elif(str(service_method) == "86"):
                    url = "http://127.0.0.1:5002/red"
                    requests.post(url , data= {})
                elif(str(service_method) == "87"):
                    url = "http://127.0.0.1:5002/green"
                    requests.post(url , data= {})
                elif(str(service_method) == "88"):
                    url = "http://127.0.0.1:5002/blue"
                    requests.post(url , data= {})

            #hue pym
            if(str(service_id) == "107"):
                if(str(service_method) == "135"):
                    url = "http://127.0.0.1:5002/turnon"
                    requests.post(url , data= {})
                elif(str(service_method) == "137"):
                    url = "http://127.0.0.1:5002/turnoff"
                    requests.post(url , data= {})

            #test google
            if(str(service_id) == "51"):
                url = "http://127.0.0.1:8004/api/docs/create/"
                auth = message['formInputValues']['auth']['value']
                title = message['formInputValues']['title']['value']
                first_name = message['formInputValues']['first_name']['value']
                last_name = message['formInputValues']['last_name']['value']
                position = message['formInputValues']['position']['value']
                date_of_birth = message['formInputValues']['date_of_birth']['value']
                phone = message['formInputValues']['phone']['value']
                address = message['formInputValues']['address']['value']
                university = message['formInputValues']['university']['value']
                faculty = message['formInputValues']['faculty']['value']
                GPA = message['formInputValues']['GPA']['value']
                payload = {'auth':auth,'title':title,'first_name':first_name,'last_name':last_name,
                           'position':position, 'date_of_birth':date_of_birth,'phone':phone,
                           'address':address, 'university':university,'faculty':faculty,
                           'GPA':GPA}
                request_data = payload
                requests.post(url , data= request_data)
                print("Google Success")

            
            #test email
            if(str(service_id) == "1"):
                email = message['formInputValues']['email']['value']
                subject = message['formInputValues']['subject']['value']
                message_data = message['formInputValues']['message']['value']
                request_input = {"receiver":[email],"emailBody":message_data,"emailTitle":subject}
                requests.post('http://127.0.0.1:8003/api/email', json= request_input)

            #test Zmote (Pyrm)
            if(str(service_id) == "72"):
                if(str(service_method) == "132"):
                    url = "http://127.0.0.1:5002/turn_off"
                    requests.post(url , data= {})

            #test tts
            if(str(service_id) == "85"):
                url = "http://127.0.0.1:5005/say"
                sentence = message['formInputValues']['sentence']['value']
                result = requests.post(url , data = {"sentence": sentence})

            #test line
            if(str(service_id) == "4"):
                url = "https://safe-beyond-22181.herokuapp.com/notify"
                user_id = message['formInputValues']['user_id']['value']
                message_data = message['formInputValues']['message']['value']
                request_data = {"user_id":user_id, "message":message_data}
                requests.post(url , data= request_data)

        except:
            print("Local Service calling Error")



