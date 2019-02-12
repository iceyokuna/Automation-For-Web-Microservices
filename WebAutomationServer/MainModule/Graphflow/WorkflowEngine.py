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
##                element = element['elements'][0]
                element = element['elements']
                for lane in element:
                    print('id: ',lane['attributes']['id'], end = '\tlane owner : ')
                    print(lane['attributes']['name'], end = "\tref elements id : ")
                    elements_in_lane = lane['elements']
                    for element_ref in elements_in_lane:
                        element_ref = element_ref['elements'][0]
                        print(element_ref['text'], end = ", ")
                    print()
                    
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
elements_list2 = [{'type': 'element', 'name': 'bpmn2:laneSet', 'attributes': {'id': 'LaneSet_1yijipe'}, 'elements': [{'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_0cp0rti', 'name': 'id_1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'StartEvent_18ktykv'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_0qz6rn4'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'EndEvent_0bfcthj'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_1wxqlnd'}]}]}]}, {'type': 'element', 'name': 'bpmn2:startEvent', 'attributes': {'id': 'StartEvent_18ktykv', 'name': 'Start'}, 'elements': [{'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_0qz6rn4', 'name': 'Task1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_1g7v2nr', 'sourceRef': 'StartEvent_18ktykv', 'targetRef': 'Task_0qz6rn4'}}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0ogr2u7', 'sourceRef': 'Task_0qz6rn4', 'targetRef': 'Task_1wxqlnd'}}, {'type': 'element', 'name': 'bpmn2:endEvent', 'attributes': {'id': 'EndEvent_0bfcthj', 'name': 'End'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0zwdzk9'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_1wxqlnd', 'name': 'Task2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0zwdzk9'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0zwdzk9', 'sourceRef': 'Task_1wxqlnd', 'targetRef': 'EndEvent_0bfcthj'}}]
elements_list3 = [{'type': 'element', 'name': 'bpmn2:laneSet', 'attributes': {'id': 'LaneSet_1yijipe'}, 'elements': [{'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_0cp0rti', 'name': 'id_1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'StartEvent_18ktykv'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_0qz6rn4'}]}]}, {'type': 'element', 'name': 'bpmn2:lane', 'attributes': {'id': 'Lane_01mv86i', 'name': 'id_2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'EndEvent_0bfcthj'}]}, {'type': 'element', 'name': 'bpmn2:flowNodeRef', 'elements': [{'type': 'text', 'text': 'Task_19mpxx2'}]}]}]}, {'type': 'element', 'name': 'bpmn2:startEvent', 'attributes': {'id': 'StartEvent_18ktykv', 'name': 'Start'}, 'elements': [{'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}]}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_0qz6rn4', 'name': 'Task1'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_1g7v2nr'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_1g7v2nr', 'sourceRef': 'StartEvent_18ktykv', 'targetRef': 'Task_0qz6rn4'}}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0ogr2u7', 'sourceRef': 'Task_0qz6rn4', 'targetRef': 'Task_19mpxx2'}}, {'type': 'element', 'name': 'bpmn2:endEvent', 'attributes': {'id': 'EndEvent_0bfcthj', 'name': 'End'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0eb6i05'}]}]}, {'type': 'element', 'name': 'bpmn2:sequenceFlow', 'attributes': {'id': 'SequenceFlow_0eb6i05', 'sourceRef': 'Task_19mpxx2', 'targetRef': 'EndEvent_0bfcthj'}}, {'type': 'element', 'name': 'bpmn2:task', 'attributes': {'id': 'Task_19mpxx2', 'name': 'Task2'}, 'elements': [{'type': 'element', 'name': 'bpmn2:incoming', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0ogr2u7'}]}, {'type': 'element', 'name': 'bpmn2:outgoing', 'elements': [{'type': 'text', 'text': 'SequenceFlow_0eb6i05'}]}]}]

w = WorkflowEngine(elements_list3)
