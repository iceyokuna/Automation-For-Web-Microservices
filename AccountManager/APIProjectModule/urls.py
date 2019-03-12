from django.urls import path, include, reverse
from . import views
from rest_framework import routers


from APIProjectModule.views import WorkflowView, CollaboratorView
routers = routers.DefaultRouter()

#routers.register('admin', views.AdminView)
#routers.register('workflow', views.WorkflowView)
routers.register('collaborator', CollaboratorView)

urlpatterns = [
    path('workflow', WorkflowView.as_view()),
    #path('api/collaborator', CollaboratorView),
    path('', include(routers.urls))
    
]