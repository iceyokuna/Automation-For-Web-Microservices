from django.shortcuts import render
from rest_framework import viewsets
from .models import Workflow, Collaborator#, Admin, 
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
   


class CollaboratorView(viewsets.ModelViewSet):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer

'''
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
''' 
    
