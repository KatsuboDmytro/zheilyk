import os

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import DecimalField

SIZE_CHOICES = [
    ("CHOICE1", "XS"),
    ("CHOICE2", "S"),
    ("CHOICE3", "M"),
    ("CHOICE4", "L"),
    ("CHOICE5", "XL"),
    ("CHOICE6", "XXL"),
    ("CHOICE7", "3XXL"),
]
COLORS_CHOICES = [
    ("White", "White"),
    ("BLUE", "Blue"),
    ("RED", "Red"),
    ("SILVER", "Silver"),
    ("GREY", "Grey"),
    ("VIOLET", "Violet"),
    ("BLACK", "Black"),
]


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


def furniture_upload_path(instance, filename) -> str:
    _, ext = os.path.splitext(filename)
    return os.path.join("items", f"{instance.id}{ext}")


class Item(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    price = DecimalField(max_digits=5, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="items"
    )
    image = models.ImageField(upload_to=furniture_upload_path, null=True, blank=True)
    size = models.CharField(choices=SIZE_CHOICES, max_length=32, default="CHOICE1")
    color = models.CharField(choices=COLORS_CHOICES, max_length=32, default="GREEN")
    in_stock = models.BooleanField(default=False)
    sale = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Basket(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="baskets"
    )
    items = models.ManyToManyField(Item, related_name="baskets")
