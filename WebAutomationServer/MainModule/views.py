from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def main_index(request):
    return render(request, 'main_web.html', {})

def end_index(request):
    return render(request, 'end_web.html', {})

@csrf_exempt
def saveFlow(request):
    resquest = json.loads(request.body.decode('utf-8'))
    print(resquest)
    # msg_client = (resquest['message'])
    
    print("------saved--------")
    msg = {}
    msg['message'] = 'done'
    return HttpResponse(json.dumps(msg),content_type= "application/json")
     

