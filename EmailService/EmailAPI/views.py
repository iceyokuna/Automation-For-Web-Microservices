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
from django.template.loader import render_to_string
from mail_templated import send_mail
from rest_framework.permissions import AllowAny
#from .Templates import email
# Create your views here.
from rest_framework.permissions import  IsAuthenticated
from django.core.mail import EmailMultiAlternatives

@permission_classes((AllowAny,))
class EmailView(APIView):
    def post(self, request):
        
        subject = request.data.get('subject')
        #message = request.data.get('message')
        recipient_list = request.data.get('email')
        email_from = settings.EMAIL_HOST_USER
        
        msg_plain = render_to_string('templates/email.txt', {})
        msg_html = render_to_string('./templates/email.html', {})
        #tmpl = email

        if(send_mail( subject, msg_plain, email_from, [recipient_list], html_message=msg_html )):
        #if(send_mail( subject, message, email_from, recipient_list )):
        #if(send_mail('email.tpl',{}, email_from, recipient_list )):
            return Response(request.data, status=HTTP_200_OK)
        

        return Response( status=HTTP_400_BAD_REQUEST)