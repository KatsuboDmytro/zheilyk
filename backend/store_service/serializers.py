from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField, SlugRelatedField

from user_service.serializers import UserSerializer

from .models import Basket, Category, ImageItem, Item


class ImageItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageItem
        fields = ["image"]


class ItemSerializer(serializers.ModelSerializer):
    images = ImageItemSerializer(many=True, read_only=True)
    size = serializers.SlugRelatedField(slug_field="size", read_only=True, many=True)
    color = serializers.SlugRelatedField(slug_field="color", read_only=True, many=True)

    class Meta:
        model = Item
        fields = [
            "id",
            "brand",
            "images",
            "name",
            "description",
            "price",
            "category",
            "size",
            "color",
            "sale",
            "in_stock",
        ]


class ItemDetailSerializer(ItemSerializer):
    class Meta:
        model = Item
        fields = ["id", "image", "name", "description", "price", "category", "size"]


class BasketSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = PrimaryKeyRelatedField(many=True, queryset=Item.objects.all())

    class Meta:
        model = Basket
        fields = [
            "id",
            "user",
            "items",
        ]

    def create(self, validated_data):
        items = validated_data.pop("items", [])
        user = self.context["request"].user
        basket, created = Basket.objects.get_or_create(user=user)
        for item in items:
            basket.items.add(item)
            basket.save()

        return basket


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]
