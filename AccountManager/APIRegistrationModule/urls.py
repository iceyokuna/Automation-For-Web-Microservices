from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register('all_user', views.AllUserView)
routers.register('fcm_token', views.FcmTokenView)

urlpatterns = [
    path('', include(routers.urls)),
    path('notification/', views.NotificationView.as_view()),
    path('send_notification/', views.SendNotificationView.as_view()),
]