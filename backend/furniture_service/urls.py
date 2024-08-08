from django.urls import path, include
from rest_framework import routers

from furniture_service.views import FurnitureModelViewSet

router = routers.DefaultRouter()
router.register('furnitures', FurnitureModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

app_name = 'furniture_service'