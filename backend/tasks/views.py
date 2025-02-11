from rest_framework import generics
from .models import Company, Phone, Task
from .serializers import CompanySerializer, PhoneSerializer, TaskSerializer


class CompanyListView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class PhoneListView(generics.ListCreateAPIView):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer


class PhoneDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer


class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        Filter tasks by type (Public or Confidential), user or company (Serie or Document).
        """
        queryset = super().get_queryset()
        type = self.request.query_params.get("type")
        if type:
            queryset = queryset.filter(type=type)

        company_serie = self.request.query_params.get("serie")
        company_document = self.request.query_params.get("document")

        if company_serie:
            queryset = queryset.filter(company__serie=company_serie)
        if company_document:
            queryset = queryset.filter(company__document=company_document)

        return queryset
