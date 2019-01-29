from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User

# Create your models here.
class Project(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    workflow = JSONField(null=False)
    user = models.ForeignKey(User, related_name='project_user', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Admin(models.Model):
    #id = models.AutoField(primary_key=True)
    project = models.CharField(max_length=200)
    admin = models.ForeignKey(User, related_name='project_admin', on_delete=models.CASCADE)
    
    #def __str__(self):
    #    return self.name

class Collaborator(models.Model):
    project = models.ForeignKey(Project, related_name='project_col', on_delete=models.CASCADE)
    Collaborator = models.ForeignKey(User, related_name='collaborator', on_delete=models.CASCADE)