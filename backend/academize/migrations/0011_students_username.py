# Generated by Django 4.1.7 on 2023-04-04 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('academize', '0010_mark_student_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='students',
            name='username',
            field=models.CharField(default='null', max_length=150),
            preserve_default=False,
        ),
    ]
