from django.contrib import admin
from .models import Workflow, Collaborator,Log
# Register your models here.

admin.site.register(Workflow)
admin.site.register(Collaborator)
admin.site.register(Log)