from rest_framework import serializers
from .models import Todo, Location

# Convert model instances to JSON so that the frontend can work with the 
# received data.
class TodoSerializer(serializers.ModelSerializer):
  location = serializers.SerializerMethodField()

  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'location', 'completed')

  def get_location(self, obj):
    location = Location.objects.get(pk=obj.location.id)
    return LocationSerializer(location).data

class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'

      