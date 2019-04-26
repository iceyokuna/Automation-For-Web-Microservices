from django.urls import path, include, reverse
from . import views
from rest_framework import routers


from APIProjectModule.views import WorkflowView, CollaboratorView
#routers = routers.DefaultRouter()

#routers.register('admin', views.AdminView)
#routers.register('workflow', views.WorkflowView)
#routers.register('collaborator/<int:workflow_id>', CollaboratorView.as_view())

urlpatterns = [
    path('workflow', WorkflowView.as_view()),
    path('collaborator/<int:workflow_id>', CollaboratorView.as_view()),
    path('collaborator/', CollaboratorView.as_view()),
    #pth('workflow_obj/', )
    #path('', include(routers.urls))
    
]