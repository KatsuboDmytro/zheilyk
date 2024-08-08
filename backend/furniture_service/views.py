from django.shortcuts import render
from rest_framework import viewsets

from furniture_service.models import Furniture
from furniture_service.serializers import FurnitureSerializer


class FurnitureModelViewSet(viewsets.ModelViewSet):
    serializer_class = FurnitureSerializer
    queryset = Furniture.objects.all()