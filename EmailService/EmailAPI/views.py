from django.core.mail import send_mail
from django.conf import settings

#rest framework
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED
)
from rest_framework.response import Response
# Create your views here.



class EmailView(APIView):
    def post(self, request):
        subject = request.data.get('subject')
        message = request.data.get('message')
        recipient_list = request.data.get('email')
        email_from = settings.EMAIL_HOST_USER

        if(send_mail( subject, message, email_from, [recipient_list] )):
            return Response(request.data, status=HTTP_200_OK)

        return Response( status=HTTP_400_BAD_REQUEST)