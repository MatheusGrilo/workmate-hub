from rest_framework import serializers
from .models import Phone, Company, Task


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = [
            "number",
            "type",
            "company",
            "created_by",
            "created_at",
            "updated_at",
        ]


class CompanySerializer(serializers.ModelSerializer):
    phones = PhoneSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = [
            "fantasy",
            "document",
            "password",
            "phones",
            "created_by",
            "created_at",
            "updated_at",
        ]


class TaskSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = Task
        fields = [
            "title",
            "description",
            "type",
            "company",
            "created_by",
            "created_at",
            "updated_at",
        ]
