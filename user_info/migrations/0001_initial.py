# Generated by Django 3.1.7 on 2021-03-16 03:16

import django.contrib.auth.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('u_name', models.CharField(max_length=32, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()])),
                ('u_password', models.CharField(max_length=256)),
                ('u_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'ordering': ['-created'],
            },
        ),
    ]
