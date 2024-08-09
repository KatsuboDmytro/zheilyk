# Generated by Django 4.2.14 on 2024-08-08 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store_service", "0003_item_brand"),
    ]

    operations = [
        migrations.AddField(
            model_name="item",
            name="in_stock",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="item",
            name="sale",
            field=models.BooleanField(default=False),
        ),
    ]