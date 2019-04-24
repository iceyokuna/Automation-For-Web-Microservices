from django.db import models

# Create your models here.
class ZMote(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    UUID = models.TextField(null=True)
    IP = models.TextField(null=True)
    #username = models.CharField(null=True)
    sta_mac = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Frequency(models.Model):
    ZMote = models.ForeignKey(ZMote, related_name='zmote', on_delete=models.CASCADE)
    name = name = models.CharField(max_length=200)
    frequency = models.IntegerField(default=0)
    n = models.IntegerField(default=0)
    sequence = models.TextField(null=True)
    repeat = models.TextField(null=True)

class Client(models.Model):
    name = name = models.CharField(max_length=200)
    username = models.CharField(null=True,max_length=200)
    secret = models.CharField(null=True,max_length=200, unique=True)
    client_id = models.CharField(null=True,max_length=200)
