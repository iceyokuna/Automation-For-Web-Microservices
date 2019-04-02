from django.shortcuts import render
from rest_framework import viewsets
from .models import Workflow, Collaborator  # , Admin,
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
        if(request.POST.get('id')):
            workflow = Workflow.objects.filter(id=request.data.get('id')).update(bpmnJson=request.data.get(
                'bpmnJson'), appliedMethods=request.data.get('appliedMethods'), appliedConditions=request.data.get('appliedConditions'),appliedPreInputs=request.data.get('appliedPreInputs'))
            return Response({"detail": "successfully updated"}, status=HTTP_200_OK)
       
        workflow = Workflow.objects.create(user=request.user, bpmnJson=request.data.get('bpmnJson'), name=request.data.get('name'), description=request.data.get(
            'description'), appliedMethods=request.data.get('appliedMethods'), appliedConditions=request.data.get('appliedConditions'),  appliedPreInputs=request.data.get('appliedPreInputs'), generatedForms=request.data.get('generatedForms'))

        return Response({"detail": "successfully created", "workflow_id":workflow.id, "workflow_name":workflow.name,"workflow_description":workflow.description, }, status=HTTP_200_OK)

    # def put(self, request):


class CollaboratorView(APIView):
    def get(self, request, workflow_id=0):

        if (workflow_id == 0):
            queryset = Collaborator.objects.all().values('id', 'collaborator__id',
                                                         'collaborator__first_name', 'collaborator__last_name')
            return Response({'workflows': queryset}, status=HTTP_200_OK)

        queryset = Collaborator.objects.filter(workflow=workflow_id).values(
            'id', 'collaborator__id', 'collaborator__first_name', 'collaborator__last_name')
        return Response({'collaborators': queryset}, status=HTTP_200_OK)

    def post(self, request):
        workflow_id = request.data.get('workflow_id')
        # request.POST.get('workflow'))
        workflow = Workflow.objects.filter(id=workflow_id).first()
        
        collaborator_list = request.data.get('collaborators')
        for i in collaborator_list:
            user = User.objects.filter(username=i).first()
            Collaborator.objects.create(workflow=workflow,  collaborator=user)
        return Response({"detail":"successfully saved"}, status=HTTP_200_OK)


'''
class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
'''
