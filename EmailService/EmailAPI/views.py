from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
import json
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def email(request):
    #subject = 'Thank you for registering to our site'
    #message = ' it  means a world to us '
    email_from = settings.EMAIL_HOST_USER
    #recipient_list = ['treesakul@hotmail.com',]
    subject = request.POST.get('subject')
    message = request.POST.get('message')
    recipient_list = request.POST.get('email')
    send_mail( subject, message, email_from, [recipient_list] )

    data = {'status': 'successful'}
    return HttpResponse(json.dumps(data), content_type='application/json')