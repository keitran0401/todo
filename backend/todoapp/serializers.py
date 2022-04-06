from rest_framework import serializers
from .models import Todo, Location

# Convert model instances to JSON so that the frontend can work with the 
# received data.
class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = '__all__'

  # By using this method, we don't need two separate fields for creation and reading. 
  # https://stackoverflow.com/questions/29950956/drf-simple-foreign-key-assignment-with-nested-serializers
  def to_representation(self, instance):
      response = super().to_representation(instance)
      response['location'] = LocationSerializer(instance.location).data
      return response