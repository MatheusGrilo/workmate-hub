from django.contrib import admin
from .models import Company, Phone, Task

admin.site.register([Company, Phone, Task])
