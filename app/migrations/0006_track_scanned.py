# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 17:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_track_crc'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='scanned',
            field=models.BooleanField(default=False),
        ),
    ]