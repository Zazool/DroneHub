# jobs/models.py
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# Custom User model extending Django's AbstractUser
class User(AbstractUser):
    # Define role choices for the user
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('pilot', 'Pilot'),
    )
    # Add a role field to the User model
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    
    # Override the default groups field to change the related_name
    groups = models.ManyToManyField(
        Group,
        related_name='jobs_user_set',  # Change this related_name
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        verbose_name=('groups'),
    )
    # Override the default user_permissions field to change the related_name
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='jobs_user_permissions_set',  # Change this related_name
        blank=True,
        help_text=('Specific permissions for this user.'),
        verbose_name=('user permissions'),
    )

# Job model to store job details
class Job(models.Model):
    title = models.CharField(max_length=100, default='Untitled Job')
    description = models.TextField(default='No description provided.')
    date_commencing = models.DateField(null=True, blank=True)
    date_ending = models.DateField(null=True, blank=True)
    operator_duration = models.IntegerField(default=1)
    operator_duration_unit = models.CharField(max_length=20, default='hour')
    editing_options = models.JSONField(default=dict)
    equipment = models.JSONField(default=dict)
    other_equipment = models.TextField(default='None')
    service = models.CharField(max_length=50, default='Standard')
    postcode = models.CharField(max_length=20, default='00000')
    contact_email = models.EmailField(default='no-reply@example.com')
    contact_name = models.CharField(max_length=100, default='Unnamed Contact')
    contact_phone = models.CharField(max_length=15, default='0000-000-0000')
    # Foreign key to link the job to a client (commented out for now)
    # client = models.ForeignKey(User, on_delete=models.CASCADE) 

# Transaction model to store transactions between pilots and jobs
class Transaction(models.Model):
    # Foreign key to link the transaction to a pilot
    pilot = models.ForeignKey(User, on_delete=models.CASCADE)
    # Foreign key to link the transaction to a job
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    # Date and time when the transaction was made
    purchase_date = models.DateTimeField(auto_now_add=True)