import os

from django.db import models
from django.db.models import DecimalField


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


def furniture_upload_path(instance, filename) -> str:
    _, ext = os.path.splitext(filename)
    return os.path.join('furniture', f'{instance.id}{ext}')

class Furniture(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = DecimalField(max_digits=5, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    image = models.ImageField(upload_to=furniture_upload_path, null=True, blank=True)

    def __str__(self):
        return self.name