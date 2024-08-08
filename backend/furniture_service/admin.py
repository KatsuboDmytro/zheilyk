from django.contrib import admin

from furniture_service.models import Furniture, Category

# Register your models here.
admin.site.register(Furniture)
admin.site.register(Category)