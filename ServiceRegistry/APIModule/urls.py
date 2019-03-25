from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register('all_services/', views.AllServicesView)
routers.register('services/', views.ServiceView)
routers.register('methods/', views.MethodView)
routers.register('connecting_methods/(?P<m_id>\d+)', views.ConnectingMethodView)

urlpatterns = [
    path('', include(routers.urls)),
    path('lookup/', views.ServiceLookupView.as_view())  
]