from Core.ServiceTask import ServiceTask
from Core.UserTask import UserTask
from Core.StartEvent import StartEvent
from Core.EndEvent import EndEvent
from Core.ExclusiveGateway import ExclusiveGateway
from Core.SequenceFlow import SequenceFlow
from Core.IOtypes import *

class WorkflowEngine:
    def __init__(self, elements_list):
        #Q
        self.state = set()
        #delta
        self.transition = set()
        #S
        self.currentState = set()
        #E
        self.endState = set()
        self.elements_list = elements_list
        self.initialize()

    def initialize(self):
        for element in self.elements_list:
            #print(element['name'])
            if(element['name'] == 'bpmn2:laneSet'):
                print("\nLane Elements")
                element = element['elements'][0]
                print('id: ',element['attributes']['id'], end = '\tlane owner : ')
                print(element['attributes']['name'])
            elif(element['name'] == 'bpmn2:startEvent'):
                print("\nStart Event Element")
                print('id: ',element['attributes']['id'], end = '\tname : ')
                print(element['attributes']['name'])
            elif(element['name'] == 'bpmn2:endEvent'):
                print("\nEnd Event Element")
                print('id: ',element['attributes']['id'], end = '\tname : ')
                print(element['attributes']['name'])
            elif(element['name'] == 'bpmn2:task'):
                print("\nTask Elements")
                print('id: ',element['attributes']['id'], end = '\tname : ')
                print(element['attributes']['name'])
            elif(element['name'] == 'bpmn2:sequenceFlow'):
                print("\nsequencial flow elements")
                print('id: ',element['attributes']['id'], end = '\t ingoing : \t')
                print(element['attributes']['sourceRef'], end = '\t outging :')
                print(element['attributes']['targetRef'])


            
elements_list1 = [{'type': 'element', 'name': 'bpmn2:laneSet', 'attributes': {'id': 'LaneSet_1yijipe'}, 'elements': [{'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_0cp0rti', 'name': 'id_1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'StartEvent_18ktykv'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_0qz6rn4'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'EndEvent_0bfcthj'}]}]}]}, {'type': 'element', 'name': 'bpmn2:startEvent', 'attributes': {'id': 'StartEvent_18ktykv', 'name': 'Start'}, 'elements': [{'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_0qz6rn4', 'name': 'Task1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:endEvent', 'attributes': {'id': 'EndEvent_0bfcthj', 'name': 'End'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_1g7v2nr', 'sourceRef': 'StartEvent_18ktykv', 'targetRef': 'Task_0qz6rn4'}}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0ogr2u7', 'sourceRef': 'Task_0qz6rn4', 'targetRef': 'EndEvent_0bfcthj'}}]


w = WorkflowEngine(elements_list1)

