from django.db import models

# Create your models here.
class File(models.Model):
    #id = models.AutoField(primary_key=True)
    description = models.TextField(blank=True)
    file = models.FileField(blank=True, default='')
    #user = ForeignKey(User, related_name='experiments')    