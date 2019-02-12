from MainModule.Graphflow.Core.ServiceTask import ServiceTask
from MainModule.Graphflow.Core.UserTask import UserTask
from MainModule.Graphflow.Core.StartEvent import StartEvent
from MainModule.Graphflow.Core.EndEvent import EndEvent
from MainModule.Graphflow.Core.ExclusiveGateway import ExclusiveGateway
from MainModule.Graphflow.Core.SequenceFlow import SequenceFlow
from MainModule.Graphflow.Core.IOtypes import *
import pickle

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
                Task = ServiceTask(Id, name, inputType, outputType, lane_owner)
                Task.setHTML(element_ref_html[element['attributes']['id']])
                self.state[element['attributes']['id']] = Task

            #Flows
            elif(element['name'] == 'bpmn2:sequenceFlow'):
                self.transition[(element['attributes']['sourceRef'],"")] = element['attributes']['targetRef']

    def start(self):
        self.currentState["current"] = self.transition[(self.currentState["current"],"")]
        element_object = self.state[self.currentState["current"]]
        return (element_object.getHTML())
        
    def next(self):
        self.currentState["current"] = self.transition[(self.currentState["current"],"")]
        if(self.currentState["current"] in self.endState):
            return "{'formHtml': '<div>Done</div>', 'formCss': ''}"
        element_object = self.state[self.currentState["current"]]
        return (element_object.getHTML())
            
##elements_list1 = [{'type': 'element', 'name': 'bpmn2:laneSet', 'attributes': {'id': 'LaneSet_1yijipe'}, 'elements': [{'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_0cp0rti', 'name': 'id_1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'StartEvent_18ktykv'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_0qz6rn4'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'EndEvent_0bfcthj'}]}]}]}, {'type': 'element', 'name': 'bpmn2:startEvent', 'attributes': {'id': 'StartEvent_18ktykv', 'name': 'Start'}, 'elements': [{'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_0qz6rn4', 'name': 'Task1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:endEvent', 'attributes': {'id': 'EndEvent_0bfcthj', 'name': 'End'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_1g7v2nr', 'sourceRef': 'StartEvent_18ktykv', 'targetRef': 'Task_0qz6rn4'}}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0ogr2u7', 'sourceRef': 'Task_0qz6rn4', 'targetRef': 'EndEvent_0bfcthj'}}]
##elements_list2 = [{'type': 'element', 'name': 'bpmn2:laneSet', 'attributes': {'id': 'LaneSet_1yijipe'}, 'elements': [{'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_0cp0rti', 'name': 'id_1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'StartEvent_18ktykv'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_0qz6rn4'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'EndEvent_0bfcthj'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_1wxqlnd'}]}]}]}, {'type': 'element', 'name': 'bpmn2:startEvent', 'attributes': {'id': 'StartEvent_18ktykv', 'name': 'Start'}, 'elements': [{'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_0qz6rn4', 'name': 'Task1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_1g7v2nr', 'sourceRef': 'StartEvent_18ktykv', 'targetRef': 'Task_0qz6rn4'}}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0ogr2u7', 'sourceRef': 'Task_0qz6rn4', 'targetRef': 'Task_1wxqlnd'}}, {'type': 'element', 'name': 'bpmn2:endEvent', 'attributes': {'id': 'EndEvent_0bfcthj', 'name': 'End'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0zwdzk9'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_1wxqlnd', 'name': 'Task2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0zwdzk9'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0zwdzk9', 'sourceRef': 'Task_1wxqlnd', 'targetRef': 'EndEvent_0bfcthj'}}]
##elements_list3 = [{'type': 'element', 'name': 'bpmn2:laneSet', 'attributes': {'id': 'LaneSet_1yijipe'}, 'elements': [{'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_0cp0rti', 'name': 'id_1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'StartEvent_18ktykv'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_0qz6rn4'}]}]}, {'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_01mv86i', 'name': 'id_2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'EndEvent_0bfcthj'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_19mpxx2'}]}]}]}, {'type': 'element', 'name': 'bpmn2:startEvent', 'attributes': {'id': 'StartEvent_18ktykv', 'name': 'Start'}, 'elements': [{'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_0qz6rn4', 'name': 'Task1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_1g7v2nr', 'sourceRef': 'StartEvent_18ktykv', 'targetRef': 'Task_0qz6rn4'}}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0ogr2u7', 'sourceRef': 'Task_0qz6rn4', 'targetRef': 'Task_19mpxx2'}}, {'type': 'element', 'name': 'bpmn2:endEvent', 'attributes': {'id': 'EndEvent_0bfcthj', 'name': 'End'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0eb6i05'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0eb6i05', 'sourceRef': 'Task_19mpxx2', 'targetRef': 'EndEvent_0bfcthj'}}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_19mpxx2', 'name': 'Task2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0eb6i05'}]}]}]
##elements_list4 = [{'type': 'element', 'name': 'bpmn2:laneSet', 'attributes': {'id': 'LaneSet_1yijipe'}, 'elements': [{'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_0cp0rti', 'name': 'id_1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'StartEvent_18ktykv'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_0qz6rn4'}]}]}, {'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_01mv86i', 'name': 'id_2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'EndEvent_0bfcthj'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_19mpxx2'}]}]}]}, {'type': 'element', 'name': 'bpmn2:startEvent', 'attributes': {'id': 'StartEvent_18ktykv', 'name': 'Start'}, 'elements': [{'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_0qz6rn4', 'name': 'Task1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_1g7v2nr', 'sourceRef': 'StartEvent_18ktykv', 'targetRef': 'Task_0qz6rn4'}}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0ogr2u7', 'sourceRef': 'Task_0qz6rn4', 'targetRef': 'Task_19mpxx2'}}, {'type': 'element', 'name': 'bpmn2:endEvent', 'attributes': {'id': 'EndEvent_0bfcthj', 'name': 'End'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0eb6i05'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0eb6i05', 'sourceRef': 'Task_19mpxx2', 'targetRef': 'EndEvent_0bfcthj'}}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_19mpxx2', 'name': 'Task2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0eb6i05'}]}]}]
##html_elements_list4 = [{'taskId': 'Task_04qtp5o', 'formData': {'formHtml': '<div class="c2073">T-Shirt Order\n</div><form class="form"><div class="form-group"><label class="label">Color</label><input placeholder="Type here your shirt\'s color" name="name" class="input"/></div><div class="form-group">\n  </div><div class="form-group"><label class="label">Shirt size</label></div><input name="size" placeholder="Enter your size" class="input"/><div class="form-group">\n  </div><div class="form-group"><button type="submit" class="button">Next</button></div></form>', 'formCss': '* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.button{width:100%;margin:15px 0;background-color:#009688;border:none;color:#f6f6f6;border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);color:#444444;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}'}}, {'taskId': 'Task_15y1zyq', 'formData': {'formHtml': '<div class="c2073">Location\n</div><form class="form"><div class="form-group"><label class="label">Your address</label></div><input name="address" placeholder="Enter your address" class="input"/><label class="label">City</label><input name="city" placeholder="Enter your  city" class="input"/><div class="form-group"><button type="submit" class="button">Next</button></div></form>', 'formCss': '* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.button{width:100%;margin:15px 0;background-color:#009688;border:none;color:#f6f6f6;border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);color:#444444;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}'}}, {'taskId': 'Task_082x4b7', 'formData': {'formHtml': '<div class="c2073">Payment\n</div><form class="form"><div class="form-group"><label class="label">Email</label></div><input name="email" class="input"/><label class="label">Card Number</label><div class="form-group">\n  </div><div class="form-group">\n  </div><input name="card_number" class="input"/><div class="form-group"><button type="submit" class="button">Next</button></div></form>', 'formCss': '* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:rgb(68, 68, 68);background-color:rgb(238, 238, 238);border:none;padding-top:7px;padding-right:10px;padding-bottom:7px;padding-left:10px;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:2px;border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;}.button{width:100%;margin:15px 0;background-color:rgb(0, 150, 136);border:none;color:rgb(246, 246, 246);border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;margin-top:15px;margin-right:0px;margin-bottom:15px;margin-left:0px;border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:2px;padding-top:7px;padding-right:10px;padding-bottom:7px;padding-left:10px;}.form{border-radius:3px;padding:10px 15px;box-shadow:0px 1px 4px 0px;color:rgb(68, 68, 68);border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}'}}, {'taskId': 'Task_1xtdmoe', 'formData': {'formHtml': '<div class="c2073">Summary\n</div><form class="form"><div class="form-group"><label class="label">Name</label></div><div id="name" class="c3839">Insert your text here\n  </div><label class="label">Shirt Size</label><div id="size" class="c4017">Insert your text here\n  </div><label class="label">Address</label><div id="address" class="c4820">Insert your text here\n  </div><label class="label">City</label><div id="city" class="c5196">Insert your text here\n  </div><label class="label">Email</label><div id="email" class="c5716">Insert your text here\n  </div><label class="label">Card Number</label><div id="card_number" class="c6083">Insert your text here\n  </div><div class="form-group"><button type="submit" class="button">OK</button></div></form>', 'formCss': '* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;font-weight:700;}.button{width:100%;margin:15px 0;background-color:rgb(0, 150, 136);border:none;color:rgb(246, 246, 246);border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;margin-top:15px;margin-right:0px;margin-bottom:15px;margin-left:0px;border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:2px;padding-top:7px;padding-right:10px;padding-bottom:7px;padding-left:10px;}.form{border-radius:3px;padding:10px 15px;box-shadow:0px 1px 4px 0px;color:rgb(68, 68, 68);border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}.c3839{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c4017{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c4820{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c5196{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c5716{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c6083{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}'}}, {'taskId': 'Task_0qz6rn4', 'formData': {'formHtml': '<div class="row"><div class="cell"><div class="c1935">Page 1 Hello world</div></div></div>', 'formCss': '* { box-sizing: border-box; } body {margin: 0;}.row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.cell{width:8%;display:table-cell;height:75px;}.c1935{padding:10px;}@media (max-width: 768px){.cell{width:100%;display:block;}}'}}, {'taskId': 'Task_19mpxx2', 'formData': {'formHtml': '<div class="c1787">Page2 Hello World</div>', 'formCss': '* { box-sizing: border-box; } body {margin: 0;}.c1787{padding:10px;}'}}]
##
##workflowEngine = WorkflowEngine()
##workflowEngine.initialize(elements_list4, html_elements_list4)
##
##with open('workflow_instance.pkl', 'wb') as f:
##    pickle.dump(workflowEngine, f)
##
##workflowEngine_load = WorkflowEngine()
##with open('workflow_instance.pkl', 'rb') as f:
##    workflowEngine_load = pickle.load(f)
##    
##print(workflowEngine_load.start(),'\n')
##print(workflowEngine_load.next(),'\n')
##print(workflowEngine_load.next())




