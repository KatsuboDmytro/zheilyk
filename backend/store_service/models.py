import os

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import DecimalField


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
    price = DecimalField(max_digits=5, decimal_places=2)
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
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="baskets"
    )
    items = models.ManyToManyField(Item, related_name="baskets")
