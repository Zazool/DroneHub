# jobs/urls.py
from django.urls import path
from .views import RegisterUserView, CustomAuthToken, JobListCreateView, PurchaseJobDetailView, JobDetailView
from django.http import HttpResponse
def home(request):
    return HttpResponse("Welcome to DroneHub!")

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('jobs/', JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<int:job_id>/', JobDetailView.as_view(), name='job-detail'),  
    path('jobs/<int:job_id>/purchase/', PurchaseJobDetailView.as_view(), name='purchase-job-detail'),
]