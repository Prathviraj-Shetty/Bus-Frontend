# Generated by Django 4.1.7 on 2023-04-03 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_instructor_course'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('regnoe', models.CharField(default='', max_length=122)),
                ('name', models.CharField(default='', max_length=122)),
            ],
        ),
    ]
