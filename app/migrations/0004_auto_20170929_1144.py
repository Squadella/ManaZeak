# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 11:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20170927_0735'),
    ]

    operations = [
        migrations.RenameField(
            model_name='album',
            old_name='numberOfDisc',
            new_name='totalDisc',
        ),
        migrations.RenameField(
            model_name='album',
            old_name='numberTotalTrack',
            new_name='totalTrack',
        ),
    ]
