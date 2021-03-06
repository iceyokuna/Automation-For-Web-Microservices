# Generated by Django 2.1.2 on 2019-04-16 05:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('APIRegistrationModule', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FcmToken',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fcmToken', models.CharField(max_length=200)),
                ('user', models.ForeignKey(db_column='username', on_delete=django.db.models.deletion.CASCADE, related_name='firebase_user', to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
    ]
