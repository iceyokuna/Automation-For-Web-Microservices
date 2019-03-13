from django.shortcuts import render
from rest_framework import viewsets
from .models import Workflow, Collaborator#, Admin, 
from django.contrib.auth.models import User
from .serializers import WorkflowSerializer,CollaboratorSerializer # AdminSerializer, 
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
        queryset = Workflow.objects.filter(user= request.user.username).values()
        return Response({'workflow':queryset},status=HTTP_200_OK)

    def post(self, request):
        Workflow.objects.create(user= request.user, workflow = request.POST.get('workflow'), name = request.POST.get('name'))
        return Response(status=HTTP_200_OK)
   


class CollaboratorView(APIView):
    def get(self, request, workflow_id = 0):

        if (workflow_id == 0):
            queryset = Collaborator.objects.all().values('id','collaborator__id','collaborator__first_name','collaborator__last_name' )
            return Response({'workflows':queryset},status=HTTP_200_OK)

        queryset = Collaborator.objects.filter(workflow = workflow_id).values('id','collaborator__id','collaborator__first_name','collaborator__last_name' )
        return Response({'collaborators':queryset},status=HTTP_200_OK)

    def post(self, request,  workflow_id = 0):
        workflow_id = request.data.get('workflow_id')
        workflow = Workflow.objects.filter(id = workflow_id)[0]#request.POST.get('workflow'))
        collaborator_list = request.data.get('collaborators')
        for i in collaborator_list:
            user = User.objects.filter(id =i)[0]
            Collaborator.objects.create(workflow =workflow,  collaborator = user )
        return Response({"successfully saved"},status=HTTP_200_OK)




'''
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
''' 
    
