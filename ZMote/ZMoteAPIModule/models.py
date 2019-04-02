from django.db import models

# Create your models here.
class Zmote(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    UUID = models.TextField(null=True)
    IP = models.TextField(null=True)
    username = models.CharField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)