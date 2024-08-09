from django.urls import path, include
from rest_framework import routers

from .views import ItemModelViewSet, BasketModelViewSet

router = routers.DefaultRouter()
router.register("items", ItemModelViewSet)
router.register("basket", BasketModelViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

app_name = "store_service"
