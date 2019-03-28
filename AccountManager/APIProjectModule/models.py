from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
'''
# Create your models here.
class Workflow(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    bpmnJson = JSONField(null=False)
    description = models.TextField(null=True)
    user = models.ForeignKey(User, to_field="username", db_column="username", related_name='project_user', on_delete=models.CASCADE)
    appliedMethods = JSONField(null=True)
    appliedConditions = JSONField(null=True)
    appliedPreInputs = JSONField(null=True)
    generatedForms = JSONField(null=True)
    

    def __str__(self):
        return self.name

class Admin(models.Model):
    #id = models.AutoField(primary_key=True)
    workflow = models.CharField(max_length=200)
    admin = models.ForeignKey(User, related_name='project_admin', on_delete=models.CASCADE)
    
    #def __str__(self):
    #    return self.name


class Task(models.Model):
    workflow = models.ForeignKey(Workflow, related_name='project_task', on_delete=models.CASCADE)

class Condition(models.Model):
    workflow = models.ForeignKey(Workflow, related_name='project_condition', on_delete=models.CASCADE)
    condition = models.TextField(null=True) #what columns do you want to add?

class Collaborator(models.Model):
    workflow = models.ForeignKey(Workflow, related_name='project_col', on_delete=models.CASCADE)
    collaborator = models.ForeignKey(User, related_name='collaborator', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.workflow.name

'''