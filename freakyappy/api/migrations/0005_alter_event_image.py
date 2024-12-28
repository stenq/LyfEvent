# Generated by Django 5.1.4 on 2024-12-25 11:46

import django_resized.forms
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_event_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=django_resized.forms.ResizedImageField(blank=True, crop=None, default='event_images/default.jpg', force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[500, 300], upload_to='event_images'),
        ),
    ]
