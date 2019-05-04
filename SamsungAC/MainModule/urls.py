from django.urls import path, include, reverse
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()


urlpatterns = [
    path('', include(routers.urls)),
    path('emit',views.EmitIRView.as_view()),
    path('discover_zmote',views.DiscoverView.as_view()),
    path('find_remote/<str:gadget>',views.DiscoverView.as_view()),
    path('register',views.RegisterView.as_view())

]