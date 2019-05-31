from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.

class Service(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    info = models.TextField(null=True)
    url = models.TextField(null=True)
    provider = models.TextField(null=True)
    
    def __str__(self):
        return self.name
   
class UserService(models.Model):
    #id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    info = models.TextField(null=True)
    url = models.TextField(null=True)
    #created = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class UserMethod(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    info = models.TextField(null=True)
    path = models.TextField(null=True)
    method_type = models.TextField(null=True)
    service = models.ForeignKey(UserService, related_name='methods', on_delete=models.CASCADE)
    input_interface = JSONField(null=True)
    output_interface = JSONField(null=True)
   

class Method(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    info = models.TextField(null=True)
    path = models.TextField(null=True)
    method_type = models.TextField(null=True)
    service = models.ForeignKey(Service, related_name='methods', on_delete=models.CASCADE)
    input_interface = JSONField(null=True)
    output_interface = JSONField(null=True)
   

    def __str__(self):
        return self.name


class Connecting_method(models.Model):
    #id = models.IntegerField(primary_key=True)
    method = models.ForeignKey(Method, on_delete=models.CASCADE, related_name="%(class)s_main_service")
    connecting_method = models.ForeignKey(Service,on_delete=models.CASCADE, related_name="%(class)s_connecting_service")

    def __str__(self):
        return self.name
