from django.urls import path, include, reverse
from . import views
from rest_framework import routers


from APIProjectModule.views import WorkflowView
#routers = routers.DefaultRouter()

#routers.register('admin', views.AdminView)
#routers.register('workflow', views.WorkflowView.as_view())
#routers.register('collaborator', views.CollaboratorView)

urlpatterns = [
    path('api/workflow', WorkflowView.as_view())
    #path('', include(routers.urls))
    
]