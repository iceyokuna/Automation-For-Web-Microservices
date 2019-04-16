from django.db import models

# Create your models here.
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User


class Notification(models.Model):
    user = models.ForeignKey(User, to_field="username", db_column="username", related_name='noti_user', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField(null=True)
    click_action = models.CharField(max_length=200)
    data = JSONField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    readFlag = models.BooleanField(default=False)

class FcmToken(models.Model):
    user = models.ForeignKey(User, to_field="username", db_column="username", related_name='firebase_user', on_delete=models.CASCADE,null=True, unique=True)
    fcmToken = models.CharField(max_length=200)
    
'''
    def save(self, *args, **kwargs):
        already_created = FcmToken.objects.filter(pk=self.pk).exists()
        #token = FcmToken.objects.filter()
        #user = self.context['request'].user
        fcm = super().create( **validated_data)
        return fcm
'''