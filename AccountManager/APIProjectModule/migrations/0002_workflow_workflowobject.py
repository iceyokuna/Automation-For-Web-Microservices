# Generated by Django 2.1.2 on 2019-04-16 04:39

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APIProjectModule', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='workflow',
            name='workflowObject',
            field=django.contrib.postgres.fields.jsonb.JSONField(null=True),
        ),
    ]
