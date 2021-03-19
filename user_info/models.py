from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone


# class User(models.Model):
#     username_validator = UnicodeUsernameValidator()

#     u_name = models.CharField(
#         max_length=32,
#         unique=True,
#         validators=[username_validator]
#     )
#     u_password = models.CharField(max_length=256)
#     u_email = models.EmailField(null=True, blank=True)
#     is_deleted = models.BooleanField(default=False)
#     created = models.DateTimeField(default=timezone.now)

#     class Meta:
#         ordering = ['-created']
