# Generated by Django 2.1.2 on 2019-03-26 09:53

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('APIProjectModule', '0006_auto_20190325_1638'),
    ]
    

    operations = [
        
      
        migrations.RemoveField(
            model_name='task',
            name='workflow',
        ),
        migrations.RenameField(
            model_name='workflow',
            old_name='appliedMethod',
            new_name='appliedMethods',
        ),
        migrations.RenameField(
            model_name='workflow',
            old_name='workflow',
            new_name='bpmnJson',
        ),
        migrations.AddField(
            model_name='workflow',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workflow',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='workflow',
            name='generatedForms',
            field=django.contrib.postgres.fields.jsonb.JSONField(null=True),
        ),
        migrations.AddField(
            model_name='workflow',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        
        migrations.DeleteModel(
            name='Condition',
        ),
        
        migrations.DeleteModel(
            name='Task',
        ),
    ]
