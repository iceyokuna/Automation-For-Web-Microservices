# Generated by Django 2.1.2 on 2019-02-06 14:05

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('APIProjectModule', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workflow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('workflow', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('user', models.ForeignKey(db_column='username', on_delete=django.db.models.deletion.CASCADE, related_name='project_user', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
        migrations.RemoveField(
            model_name='admin',
            name='admin',
        ),
        migrations.RemoveField(
            model_name='collaborator',
            name='Collaborator',
        ),
        migrations.RemoveField(
            model_name='collaborator',
            name='project',
        ),
        migrations.RemoveField(
            model_name='project',
            name='user',
        ),
        migrations.DeleteModel(
            name='Admin',
        ),
        migrations.DeleteModel(
            name='Collaborator',
        ),
        migrations.DeleteModel(
            name='Project',
        ),
    ]
