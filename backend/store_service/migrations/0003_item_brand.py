# Generated by Django 4.2.14 on 2024-08-08 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store_service", "0002_item_color_alter_item_size_basket"),
    ]

    operations = [
        migrations.AddField(
            model_name="item",
            name="brand",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]