# jobs/models.py
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('pilot', 'Pilot'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    
    groups = models.ManyToManyField(
        Group,
        related_name='jobs_user_set',  # Change this related_name
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        verbose_name=('groups'),
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='jobs_user_permissions_set',  # Change this related_name
        blank=True,
        help_text=('Specific permissions for this user.'),
        verbose_name=('user permissions'),
    )

class Job(models.Model):
    title = models.CharField(max_length=100, default='Untitled Job')
    description = models.TextField(default='No description provided.')
    date_commencing = models.DateField(null=True, blank=True)
    date_ending = models.DateField(null=True, blank=True)
    operator_duration = models.IntegerField(default=1)
    operator_duration_unit = models.CharField(max_length=20, default='hour')
    event_duration = models.CharField(max_length=50, default='1 hour')
    editing_options = models.JSONField(default=dict)
    equipment = models.JSONField(default=dict)
    other_equipment = models.TextField(default='None')
    service = models.CharField(max_length=50, default='Standard')
    postcode = models.CharField(max_length=20, default='00000')
    contact_email = models.EmailField(default='no-reply@example.com')
    contact_name = models.CharField(max_length=100, default='Unnamed Contact')
    contact_phone = models.CharField(max_length=15, default='000-000-0000')
    # Removed the client field maybe needed when we create users accounts.
    # client = models.ForeignKey(User, on_delete=models.CASCADE) 


class Transaction(models.Model):
    pilot = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)
