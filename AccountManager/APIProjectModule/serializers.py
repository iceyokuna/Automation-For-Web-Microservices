from rest_framework import serializers
from .models import Workflow, Collaborator #, Admin, Workflow

class WorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workflow
        fields = ('id','name','workflow','user')

    '''
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ('id', 'admin_id')
'''
class CollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaborator
        fields = ('id','workflow','collaborator')
        