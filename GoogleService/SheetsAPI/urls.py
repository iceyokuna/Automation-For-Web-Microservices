from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
#routers.register('all_services', views.AllServicesView)


urlpatterns = [
    path('', include(routers.urls)),
    path('create_view/', views.CreateView.as_view())
]