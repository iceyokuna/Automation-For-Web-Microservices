from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register('all_user', views.AllUserView)

urlpatterns = [
    path('', include(routers.urls))
]