from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register('zmote', views.ZMoteView)
routers.register('freq', views.FrequencyView)
routers.register('zmote_freq', views.ZMoteFreqView)

urlpatterns = [
    path('', include(routers.urls)),
    path('emit',views.EmitIRView.as_view()),
    path('get_mac',views.GetMacView.as_view()),
    path('discover',views.DiscoverView.as_view()),
    path('register',views.RegisterView.as_view()),
    path('auth', views.AuthView.as_view())
]