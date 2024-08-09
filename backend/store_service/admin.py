from django.contrib import admin

from .models import Item, Category, Basket

# Register your models here.
admin.site.register(Item)
admin.site.register(Category)
admin.site.register(Basket)
