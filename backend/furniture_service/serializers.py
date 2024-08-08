from rest_framework import serializers

from furniture_service.models import Furniture


class FurnitureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Furniture
        fields = ['id',"image", 'name', 'description', 'price', 'category']