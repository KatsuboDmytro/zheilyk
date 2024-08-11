# Generated by Django 4.2.14 on 2024-08-11 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store_service", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="item",
            name="color",
        ),
        migrations.RemoveField(
            model_name="item",
            name="size",
        ),
        migrations.AddField(
            model_name="item",
            name="color",
            field=models.ManyToManyField(
                related_name="items", to="store_service.itemcolor"
            ),
        ),
        migrations.AddField(
            model_name="item",
            name="size",
            field=models.ManyToManyField(
                related_name="items", to="store_service.itemsize"
            ),
        ),
    ]
