# Generated by Django 4.1.7 on 2023-04-10 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0012_mark_semester_num'),
    ]

    operations = [
        migrations.AddField(
            model_name='students',
            name='phone_number',
            field=models.CharField(default='N/A', max_length=20),
            preserve_default=False,
        ),
    ]
