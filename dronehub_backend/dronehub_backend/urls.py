# ./urls.py
from django.contrib import admin
from django.urls import include, path
from jobs.urls import home  # Import the home view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),
    path('', home, name='home'),  
]