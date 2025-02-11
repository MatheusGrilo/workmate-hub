from django.urls import path
from . import views

urlpatterns = [
    path("company/", views.CompanyListView.as_view(), name="company-list"),
    path("company/<int:pk>/", views.CompanyDetailView.as_view(), name="company-detail"),
    path("phone/", views.PhoneListView.as_view(), name="phone-list"),
    path("phone/<int:pk>/", views.PhoneDetailView.as_view(), name="phone-detail"),
    path("task/", views.TaskListView.as_view(), name="task-list"),
]
