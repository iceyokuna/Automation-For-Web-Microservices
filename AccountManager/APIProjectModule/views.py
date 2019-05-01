from django.shortcuts import render
from rest_framework import viewsets
from .models import Workflow, Collaborator, Log  # , Admin,
from django.contrib.auth.models import User
from .serializers import WorkflowSerializer, CollaboratorSerializer  # AdminSerializer,
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response

# Create your views here.
@permission_classes((IsAuthenticated,))
class WorkflowView(APIView):

    def get(self, request):
        queryset = Workflow.objects.filter(user=request.user.username).values()
        return Response({'workflow': queryset}, status=HTTP_200_OK)

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
            'description'), appliedMethods=request.data.get('appliedMethods'), appliedConditions=request.data.get('appliedConditions'),  appliedPreInputs=request.data.get('appliedPreInputs'), generatedForms=request.data.get('generatedForms'))

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

    def delete(self, request):
        if(request.data.get('id')):
            owner = Workflow.objects.filter(id=request.data.get('id')).values('user')
            if(request.user.username == owner[0].get('user')):
                workflow = Workflow.objects.filter(id=request.data.get('id')).delete()
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
            elif(Collaborator.objects.filter(workflow=workflow,  collaborator=user) == None):
                data[i]= "user is already a collaborator"
            else:
                Collaborator.objects.create(workflow=workflow,  collaborator=user)
                data[i] = "successfully addded"
        return Response({"detail":data}, status=HTTP_200_OK)

class LogView(APIView):
    def get(self, request, workflow_id):
        workflow = Workflow.objects.filter(id=workflow_id)
        if(workflow.count()>0):
            logs = Log.objects.filter(workflow=workflow.first()).order_by('-created').values()
            return Response({"detail":logs}, status= HTTP_200_OK)
        return Response({"detail":"No log file found"}, status= HTTP_400_BAD_REQUEST)

    def post(self, request, workflow_id):
        workflow = Workflow.objects.filter(id=workflow_id).first()
        user = request.user
        message = request.data.get('message')
        task_id = request.data.get('task_id')
        task_name = request.data.get('task_name')
        if(Log.objects.create(workflow=workflow, user=user, message=message, task_id=task_id,task_name=task_name)):
            return Response({"detail":"successfully saved"}, status=HTTP_200_OK)
        return Response({"detail":"Unable to create a log file"}, status= HTTP_400_BAD_REQUEST)

    #def put(self, request):
'''
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
'''
