from django.shortcuts import render
from rest_framework import viewsets
from .models import Workflow, Admin, Collaborator
from .serializers import WorkflowSerializer, AdminSerializer, CollaboratorSerializer

# Create your views here.
class WorkflowView(viewsets.ModelViewSet):
    queryset = Workflow.objects.all()
    serializer_class = WorkflowSerializer

class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    
class CollaboratorView(viewsets.ModelViewSet):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer
