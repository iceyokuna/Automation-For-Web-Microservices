from django.urls import path, include, reverse
from . import views
from rest_framework import routers


from APIProjectModule.views import WorkflowView, CollaboratorView, LogView, WorkflowObjView, WorkflowDeleteView,InternalWorkflowView
#routers = routers.DefaultRouter()

#routers.register('admin', views.AdminView)
#routers.register('workflow', views.WorkflowView)
#routers.register('collaborator/<int:workflow_id>', CollaboratorView.as_view())

urlpatterns = [
    path('workflow', WorkflowView.as_view()),
    path('workflow/<int:workflow_id>', WorkflowView.as_view()),
    path('collaborator/delete/<int:workflow_id>', WorkflowDeleteView.as_view()),
    path('workflow/obj/<int:workflow_id>', WorkflowObjView.as_view()),
    path('collaborator/<int:workflow_id>', CollaboratorView.as_view()),
    path('collaborator/', CollaboratorView.as_view()),
    path('log/<int:workflow_id>', LogView.as_view()),
    path('internal_workflow/', InternalWorkflowView.as_view())
    #pth('workflow_obj/', )
    #path('', include(routers.urls))
    
]