from django.contrib import admin
from django.urls import path
from MainModule import views

urlpatterns = [
    path('end-user/', views.end_index),
#    path('main-user/', views.main_index),
    path('create_workflow/', views.saveFlow),
]