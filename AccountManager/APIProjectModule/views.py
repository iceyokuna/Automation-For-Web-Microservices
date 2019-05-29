from django.shortcuts import render
from rest_framework import viewsets
from .models import Workflow, Collaborator, Log  # , Admin,
from django.contrib.auth.models import User
from .serializers import WorkflowSerializer, CollaboratorSerializer  # AdminSerializer,
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
import json
from APIRegistrationModule.models import FcmToken, Notification
import requests
# Create your views here.
@permission_classes((IsAuthenticated,))
class WorkflowView(APIView):

    def get(self, request):
        col_workflows = Collaborator.objects.filter(collaborator = request.user).values_list('workflow__id')
        workflows = Workflow.objects.filter(user=request.user.username)
        workflows = Workflow.objects.filter(id__in=col_workflows).values()
        owner_workflows = Workflow.objects.filter(user=request.user.username).values()
        return Response({'collaborator_workflows': workflows,'owner_workflows':owner_workflows }, status=HTTP_200_OK)
        

    def post(self, request):
        if(request.data.get('id')):
            owner = Workflow.objects.filter(id=request.data.get('id')).values('user')
            if(request.user.username == owner[0].get('user')):
                new_data =request.data.get('data')
                workflow = Workflow.objects.filter(id=request.data.get('id')).update(**new_data)
                
                return Response({"detail": "successfully updated by "+request.user.username}, status=HTTP_200_OK)
            else:
                return Response({"detail": request.user.username + " does not have access to the workflow"}, status=HTTP_200_OK) 
        
        workflow = Workflow.objects.create(user=request.user, bpmnJson=request.data.get('bpmnJson'), name=request.data.get('name'), description=request.data.get(
            'description'), appliedMethods=request.data.get('appliedMethods'), appliedConditions=request.data.get('appliedConditions'),  appliedPreInputs=request.data.get('appliedPreInputs'), generatedForms=request.data.get('generatedForms'), appliedTimers=request.data.get('appliedTimers'))
        Collaborator.objects.create(workflow=workflow,  collaborator=request.user)

        return Response({"detail": "successfully created by "+request.user.username, "workflow_id":workflow.id, "workflow_name":workflow.name,"workflow_description":workflow.description, }, status=HTTP_200_OK)

    def put(self, request):
        if(request.data.get('id')):
            owner = Workflow.objects.filter(id=request.data.get('id')).values('user')
            if(request.user.username == owner[0].get('user')):
                new_data =request.data.get('data')
                workflow = Workflow.objects.filter(id=request.data.get('id')).update(**new_data)
                
                return Response({"detail": "successfully updated by "+request.user.username}, status=HTTP_200_OK)
            else:
                return Response({"detail": request.user.username + " does not have access to the workflow"}, status=HTTP_200_OK) 

    def delete(self, request, workflow_id = 0):
        if(workflow_id != 0):
            owner = Workflow.objects.filter(id=workflow_id).values('user')
            if(request.user.username == owner[0].get('user')):
                workflow = Workflow.objects.filter(id=workflow_id).delete()
                return Response({"detail": "successfully deleted by "+request.user.username}, status=HTTP_200_OK)
            else:
                return Response({"detail": request.user.username+" does not have access to the workflow"}, status=HTTP_200_OK)

#@permission_classes((IsAuthenticated,))
class CollaboratorView(APIView):
    def get(self, request, workflow_id=0):

        if (workflow_id == 0):
            queryset = Collaborator.objects.all().values('id', 'collaborator__id','collaborator__username',
                                                         'collaborator__first_name', 'collaborator__last_name')
            return Response({'workflows': queryset}, status=HTTP_200_OK)

        queryset = Collaborator.objects.filter(workflow=workflow_id).values(
            'id', 'collaborator__id', 'collaborator__username','collaborator__first_name', 'collaborator__last_name')
        return Response({'collaborators': queryset}, status=HTTP_200_OK)

    def post(self, request):
        workflow_id = request.data.get('workflow_id')
        workflow = Workflow.objects.filter(id=workflow_id).first()
        data = {}
        collaborator_list = request.data.get('collaborators')
        for i in collaborator_list:
            user = User.objects.filter(username=i).first()
            if(user == None ):
                data[i]= "user does not exist"
            elif(Collaborator.objects.filter(workflow=workflow,  collaborator=user).count()>0):
                data[i]= "user is already a collaborator"
            else:
                Collaborator.objects.create(workflow=workflow,  collaborator=user)
                data[i] = "successfully addded"
        return Response({"detail":data}, status=HTTP_200_OK)

class WorkflowDeleteView(APIView):
    def post(self, request, workflow_id = 0):
        if(workflow_id != 0):
            workflow = Workflow.objects.filter(id=workflow_id).first()
            data = {}
            collaborator_list = request.data.get('collaborators')
            for i in collaborator_list:
                user = User.objects.filter(username=i).first()
                if(user == None ):
                    data[i]= "user does not exist"
                if(Collaborator.objects.filter(workflow=workflow,  collaborator=user).count()==0):
                    data[i]= "user is not a collaborator"
                else:
                    col = Collaborator.objects.filter(workflow=workflow,  collaborator=user)
                    col.delete()
                    data[i] = "successfully removed"
            return Response({"detail":data}, status=HTTP_200_OK)
        return Response({"detail":"The selected workflow does not exist"}, status=HTTP_200_OK)

class WorkflowObjView(APIView):
    def get(self, request, workflow_id = 0):
        
        workflow = Workflow.objects.filter(id=workflow_id).values('workflowObject')
        if(workflow.count()>0):
            workflow_obj = workflow.first()
            return Response({"detail":workflow_obj}, status= HTTP_200_OK)
        return Response({"detail":"No object found"}, status= HTTP_400_BAD_REQUEST)
    

@permission_classes((AllowAny, ))
class LogView(APIView):
    def get(self, request, workflow_id):
        workflow = Workflow.objects.filter(id=workflow_id)
        if(workflow.count()>0):
            logs = Log.objects.filter(workflow=workflow.first()).values()#order_by('-created').values()
            return Response({"detail":logs}, status= HTTP_200_OK)
        return Response({"detail":"No log file found"}, status= HTTP_400_BAD_REQUEST)

    def post(self, request, workflow_id):
        workflow = Workflow.objects.filter(id=workflow_id).first()
        '''
        user = request.user
        message = request.data.get('message')
        task_id = request.data.get('task_id')
        task_name = request.data.get('task_name')
        to = Collaborator.objects.filter(workflow = workflow).values_list('collaborator').first()
        
        url = 'https://fcm.googleapis.com/fcm/send'
        key = 'key=AAAAvAxbvG8:APA91bFUI5zOJF0ITlKBDbdGJRGN70ENPiAM3WaNjOiMyOi6XBS-BnWyhvVUHk8BPZDSr2pmLuzQrt3m497wKIG51--G7DzGlEAeVoA9G8Fx3pfPQlYl11zZ-xdmfC5Za0ILS011Fe9y'
        headers =   {'Content-Type':  'application/json', 'Authorization':key}
        
        title = "[Task] "+task_name+" has been updated" 
        for i in to:
            
            user = User.objects.filter(id = i).first()
            
            token = FcmToken.objects.filter(user=user).values('fcmToken').first()['fcmToken']
            
            data = {"to":token,"data":{"message": message }}
            data = json.dumps(data)

            res =  requests.post(url, headers=headers, data=data)
            noti = Notification.objects.create(user=user, title=title,body=message,click_action ="", data=data)
            
        ############
        '''
        logs = request.data.get('logs')
        if(Log.objects.create(logs=logs, workflow=workflow)):
            return Response({"detail":"successfully saved"}, status=HTTP_200_OK)
        return Response({"detail":"Unable to create a log file"}, status= HTTP_400_BAD_REQUEST)

    def put(self, request, workflow_id):
        logs = request.data.get('logs')
        workflow = Workflow.objects.filter(id=workflow_id).first()

        if(Log.objects.filter(workflow= workflow).update(logs=logs)):
            return Response({"detail":"successfully saved"}, status=HTTP_200_OK)
        return Response({"detail":"Unable to create a log file"}, status= HTTP_400_BAD_REQUEST)

'''
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
'''
