from django.contrib import admin
from .models import Todo, Location

class TodoAdmin(admin.ModelAdmin):
  list_display = ["id", "title", "completed", "location"]
  # filter_horizontal = ["location"] # for many_to_many relationship

class LocationAdmin(admin.ModelAdmin):
  list_display = ["name"]

admin.site.register(Todo, TodoAdmin)
admin.site.register(Location, LocationAdmin)