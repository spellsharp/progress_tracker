# Generated by Django 4.1.7 on 2023-04-04 12:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='marks',
            name='semester',
        ),
    ]
