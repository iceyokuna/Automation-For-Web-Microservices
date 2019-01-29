from rest_framework import serializers
from .models import Collaborator, Admin, Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id','name','workflow','usere_id')

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ('id', 'admin_id')

class CollaboratorSerializer(serializers.ManyRelatedField):
    class Meta:
        model = Collaborator
        fields = ('id','collaborator_id')