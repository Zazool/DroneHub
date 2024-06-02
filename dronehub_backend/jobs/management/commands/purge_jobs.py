# ./jobs/management/commands/purge_jobs.py
from django.core.management.base import BaseCommand
from jobs.models import Job  # Adjust the import based on your app and model name

class Command(BaseCommand):
    help = 'Purge all jobs from the database'

    def handle(self, *args, **kwargs):
        Job.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully purged all jobs'))
