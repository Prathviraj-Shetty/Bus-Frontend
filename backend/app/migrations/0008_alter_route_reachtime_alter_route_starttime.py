# Generated by Django 4.1.7 on 2023-04-05 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_route_reachtime_route_starttime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='reachtime',
            field=models.TimeField(default='', max_length=122),
        ),
        migrations.AlterField(
            model_name='route',
            name='starttime',
            field=models.TimeField(default='', max_length=122),
        ),
    ]
