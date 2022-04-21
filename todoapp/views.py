from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer, LocationSerializer
from .models import Todo, Location

# The viewsets base class provides the implementation for CRUD operations 
# by default. This code specifies the serializer_class and the queryset.
class TodoView(viewsets.ModelViewSet):
  serializer_class = TodoSerializer
  queryset = Todo.objects.all()

class LocationView(viewsets.ModelViewSet):
  serializer_class = LocationSerializer
  queryset = Location.objects.all()