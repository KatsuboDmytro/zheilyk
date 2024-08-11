from django.contrib import admin

from .models import Basket, Category, ImageItem, Item, ItemColor, ItemSize


class ItemAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "category")
    filter_horizontal = ("images",)
    # Если вам нужно использовать форму для добавления изображений
    # вы можете определить форму и указать ее в ModelAdmin


class ImageItemAdmin(admin.ModelAdmin):
    list_display = ("image",)


admin.site.register(Item, ItemAdmin)
admin.site.register(ImageItem, ImageItemAdmin)
admin.site.register(ItemColor)
admin.site.register(Category)
admin.site.register(ItemSize)
