from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from user_service.serializers import UserSerializer

from .models import Basket, Category, ImageItem, Item, Order


class ImageItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageItem
        fields = ["image"]


class ItemSerializer(serializers.ModelSerializer):
    size = serializers.SlugRelatedField(slug_field="size", read_only=True, many=True)
    color = serializers.SlugRelatedField(slug_field="color", read_only=True, many=True)
    images = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = [
            "id",
            "sale_price",
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

    def get_images(self, obj):
        return [image.image.url for image in obj.images.all()]


class ItemDetailSerializer(ItemSerializer):
    class Meta:
        model = Item
        fields = ["id", "images", "name", "description", "price", "category", "size"]


class BasketSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)

    class Meta:
        model = Basket
        fields = ["id", "user", "items"]


class BasketListSerializer(BasketSerializer):
    items = ItemDetailSerializer(many=True, read_only=True)

    class Meta(BasketSerializer.Meta):
        fields = ["id", "user", "items"]  # Это уже задано в родительском классе


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]


class OrderSerializer(serializers.ModelSerializer):
    basket = BasketSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "delivery_address", "basket"]
