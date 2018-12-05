# Generated by Django 2.1.2 on 2018-12-05 14:20

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('APIModule', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='method',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('method_name', models.CharField(max_length=200)),
                ('method_info', models.TextField(null=True)),
                ('input_interface', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('output_interface', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='service',
            name='input_interface',
        ),
        migrations.RemoveField(
            model_name='service',
            name='output_interface',
        ),
        migrations.AddField(
            model_name='method',
            name='service_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='APIModule.service'),
        ),
    ]
