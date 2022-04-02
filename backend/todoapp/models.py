from django.db import models

# Create your models here.
class Location(models.Model):
  name = models.CharField(max_length=128)
  lat = models.DecimalField(max_digits=15, decimal_places=10)
  lng = models.DecimalField(max_digits=15, decimal_places=10)

  def __str__(self):
    return self.name

class Todo(models.Model):
  title = models.CharField(max_length=64)
  description = models.TextField(blank=True, default='')
  completed = models.BooleanField(default=False)
  location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="events")
  # file = models.FileField(upload_to='uploads/')

  def __str__(self):
      return self.title