from django.shortcuts import render
from .models import File
from .serializers import FIleSerializer #, AdminSerializer, CollaboratorSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import FileUploadParser
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
# Create your views here.
@permission_classes((IsAuthenticated,))
class WorkflowView(APIView):
    parser_classes = (FileUploadParser,)

    def put(self, request, filename, format=None):
        file_obj = request.FILES['file']
        des = request.POST.get('description')
        # do some stuff with uploaded file
        File.objects.create(file=file_obj, description=des)
        return Response(status=204)