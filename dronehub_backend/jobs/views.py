# ./jobs/views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import User, Job, Transaction
from .serializers import UserSerializer, JobSerializer, TransactionSerializer
import json

# View to register a new user
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Custom authentication token view
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.pk, 'email': user.email, 'role': user.role})

# View to list and create jobs
class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]  # Allow any user to access this view

    def perform_create(self, serializer):
        serializer.save()

# View to handle job purchase details
class PurchaseJobDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, job_id):
        job = Job.objects.get(id=job_id)
        transaction = Transaction.objects.create(pilot=request.user, job=job)
        return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)

# View to retrieve job details
class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    lookup_field = 'id'  # This remains the same

    def get_object(self):
        lookup_field_value = self.kwargs.get('job_id')
        return self.queryset.get(id=lookup_field_value)

# Function-based view to create a job
@csrf_exempt
def create_job(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Create a new job instance with the received data
            job = Job(
                title=data['title'],
                description=data['otherService'],
                date_commencing=data['dateCommencing'],
                date_ending=data['dateEnding'],
                operator_duration=data['operatorDuration'],
                operator_duration_unit=data['operatorDurationUnit'],
                event_duration=data['eventDuration'],
                editing_options=data['editingOptions'],
                equipment=data['equipment'],
                other_equipment=data['otherEquipment'],
                service=data['service'],
                postcode=data['postcode'],
                contact_email=data['email'],  
                contact_name=data['firstName'],  
                contact_phone=data['phone'],  
            )
            job.save()

            return JsonResponse({'id': job.id})
        except KeyError as e:
            return JsonResponse({'error': f'Missing key: {str(e)}'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    return JsonResponse({'error': 'Invalid request'}, status=400)
