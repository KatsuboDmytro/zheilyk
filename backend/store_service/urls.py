from django.urls import include, path
from rest_framework import routers

from .views import BasketModelViewSet, CategoryModelViewSet, ItemModelViewSet

router = routers.DefaultRouter()
router.register("items", ItemModelViewSet)
router.register("basket", BasketModelViewSet)
router.register("categories", CategoryModelViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

app_name = "store_service"
