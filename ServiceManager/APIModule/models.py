from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.

class service(models.Model):
    id = models.AutoField(primary_key=True)
    service_name = models.CharField(max_length=200)
    service_info = models.TextField(null=True)
   

class method(models.Model):
    id = models.AutoField(primary_key=True)
    method_name = models.CharField(max_length=200)
    method_info = models.TextField(null=True)
    service_id = models.ForeignKey(service, on_delete=models.CASCADE)
    input_interface = JSONField(null=True)
    output_interface = JSONField(null=True)


class connecting_method(models.Model):
    #id = models.IntegerField(primary_key=True)
    method_id = models.ForeignKey(method, on_delete=models.CASCADE, related_name="%(class)s_main_service")
    connecting_method = models.ForeignKey(service,on_delete=models.CASCADE, related_name="%(class)s_connecting_service")
'''
class service_input_requirement(models.Model):
    #id = models.IntegerField(primary_key=True)
    service_id = models.ForeignKey(service_info,on_delete=models.CASCADE)
    json_requirement = JSONField(null=True)

class service_output_requirement(models.Model):
    #id = models.IntegerField(primary_key=True)
    service_id = models.ForeignKey(service_info,on_delete=models.CASCADE)
    json_requirement = JSONField(null=True)'''