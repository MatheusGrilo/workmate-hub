from django.db import models
from django.conf import settings


class Company(models.Model):
    fantasy = models.CharField(max_length=128)
    social = models.CharField(max_length=128)
    serie = models.CharField(max_length=6)
    document = models.CharField(max_length=16)
    password = models.CharField(max_length=32, null=True, blank=True)
    active = models.BooleanField(default=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_companies",
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.fantasy

    class Meta:
        verbose_name_plural = "companies"


class Phone(models.Model):
    PUBLIC = "P"
    CONFIDENTIAL = "C"
    PHONE_TYPE_CHOICES = [
        (PUBLIC, "Public"),
        (CONFIDENTIAL, "Confidential"),
    ]

    number = models.CharField(max_length=16)
    type = models.CharField(
        max_length=1, choices=PHONE_TYPE_CHOICES, default=CONFIDENTIAL
    )
    company = models.ManyToManyField(Company, related_name="phones")
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="created_phones",
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.number


class Task(models.Model):
    PUBLIC = "P"
    CONFIDENTIAL = "C"
    PHONE_TYPE_CHOICES = [
        (PUBLIC, "Public"),
        (CONFIDENTIAL, "Confidential"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(
        max_length=1, choices=PHONE_TYPE_CHOICES, default=CONFIDENTIAL
    )
    company = models.ForeignKey(
        Company, related_name="tasks", on_delete=models.SET_NULL, null=True, blank=True
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="created_tasks", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
