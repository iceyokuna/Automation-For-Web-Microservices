# Generated by Django 2.1.2 on 2019-03-12 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APIProjectModule', '0003_auto_20190312_1327'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collaborator',
            old_name='Collaborator',
            new_name='collaborator',
        ),
    ]