# Generated by Django 2.1.2 on 2018-12-05 11:05

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='connecting_service',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='service',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('service_name', models.CharField(max_length=200)),
                ('service_info', models.TextField(null=True)),
                ('input_interface', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('output_interface', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='connecting_service',
            name='connecting_service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='connecting_service_connecting_service', to='APIModule.service'),
        ),
        migrations.AddField(
            model_name='connecting_service',
            name='service_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='connecting_service_main_service', to='APIModule.service'),
        ),
    ]
