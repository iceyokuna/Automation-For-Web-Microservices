from django.shortcuts import render
from rest_framework import viewsets
from .models import Project, Admin, Collaborator
from .serializers import ProjectSerializer, AdminSerializer, CollaboratorSerializer

# Create your views here.
class ProjectView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class CollaboratorView(viewsets.ModelViewSet):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer
