from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
#routers.register('admin', views.AdminView)
routers.register('workflow', views.WorkflowView)
#routers.register('collaborator', views.CollaboratorView)

urlpatterns = [
    
    path('', include(routers.urls))
    
]