from django.contrib import admin
from .models import Notification, FcmToken

# Register your models here.
admin.site.register(Notification)
admin.site.register(FcmToken)