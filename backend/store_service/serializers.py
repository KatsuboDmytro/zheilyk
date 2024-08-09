from rest_framework import serializers, request
from rest_framework.relations import PrimaryKeyRelatedField

from .models import Item, Basket
from user_service.serializers import UserSerializer


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id",
                  "brand",
                  "image",
                  "name",
                  "description",
                  "price",
                  "category",
                  "size",
                  "color",
                  "sale",
                  "in_stock"]


class ItemDetailSerializer(ItemSerializer):
    class Meta:
        model = Item
        fields = ["id", "image", "name", "description", "price", "category", "size"]


class BasketSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = PrimaryKeyRelatedField(many=True, queryset=Item.objects.all())
    class Meta:
        model = Basket
        fields = ["id", "user", "items",]

    def create(self, validated_data):
        items = validated_data.pop("items", [])
        user = self.context['request'].user
        basket, created = Basket.objects.get_or_create(user=user)
        for item in items:
            basket.items.add(item)
            basket.save()

        return basket


