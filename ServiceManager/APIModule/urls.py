from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register('services', views.ServiceView)
routers.register('methods', views.MethodView)
routers.register('connecting_methods', views.ConnectingMethodView)

urlpatterns = [
    
    path('', include(routers.urls))
    
]