# Generated by Django 4.1.7 on 2023-04-19 10:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_seat_setno'),
    ]

    operations = [
        migrations.RenameField(
            model_name='seat',
            old_name='setno',
            new_name='seatno',
        ),
    ]