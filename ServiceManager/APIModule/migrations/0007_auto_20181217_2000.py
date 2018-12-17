# Generated by Django 2.1.2 on 2018-12-17 13:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('APIModule', '0006_auto_20181217_1957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connecting_method',
            name='connecting_method',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='connecting_method_connecting_service', to='APIModule.Service'),
        ),
        migrations.AlterField(
            model_name='connecting_method',
            name='method',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='connecting_method_main_service', to='APIModule.Method'),
        ),
        migrations.AlterField(
            model_name='method',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='APIModule.Service'),
        ),
    ]
