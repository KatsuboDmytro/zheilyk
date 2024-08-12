import os

import basket
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import DecimalField

from user_service.models import DeliveryAddress


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


def item_upload_path(instance, filename) -> str:
    _, ext = os.path.splitext(filename)
    return os.path.join("items", f"{instance.id}{ext}")


class ImageItem(models.Model):
    image = models.ImageField(upload_to=item_upload_path, null=True, blank=True)


class Item(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    price = DecimalField(max_digits=9, decimal_places=2)
    sale_price = DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="items"
    )
    size = models.ManyToManyField("ItemSize", related_name="items")
    color = models.ManyToManyField("ItemColor", related_name="items")
    in_stock = models.BooleanField(default=False)
    sale = models.BooleanField(default=False)
    images = models.ManyToManyField(ImageItem, blank=True)

    def __str__(self):
        return self.name


class ItemSize(models.Model):
    size = models.CharField(max_length=100)


class ItemColor(models.Model):
    color = models.CharField(max_length=100)


class Basket(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    items = models.ManyToManyField(Item, blank=True, related_name="baskets")


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    delivery_address = models.ForeignKey(DeliveryAddress, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=9, decimal_places=2)
