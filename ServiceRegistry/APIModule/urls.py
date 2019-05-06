from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register('all_services', views.AllServicesView)
routers.register('services', views.ServiceView)
routers.register('methods', views.MethodView)
routers.register('connecting_methods/(?P<m_id>\d+)', views.ConnectingMethodView)
routers.register('all_user_service', views.AllUserServiceView)

urlpatterns = [
    path('', include(routers.urls)),
    path('lookup/', views.ServiceLookupView.as_view()),
    path('user_service/', views.UserServiceView.as_view()),  
    path('user_service/<int:service_id>', views.UserServiceView.as_view()), 
    path('user_method/<int:service_id>', views.UserMethodView.as_view()),
    path('service/add', views.NewServiceView.as_view())
    #path('all_user_service/', views.AllUserServiceView.as_view())
]