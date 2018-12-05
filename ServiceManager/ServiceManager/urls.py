"""ServiceManager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from APIModule import views
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get_available_service', views.get_available_service),
    path('get_service_input_req/', views.get_service_input_req),
    path('get_service_output_req/', views.get_service_output_req),
    path('update/', views.update_service),
    path('create/', views.create_service),
]
