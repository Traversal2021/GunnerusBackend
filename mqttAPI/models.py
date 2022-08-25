from django.db import models

# Create your models here.
class mqttInfo (models.Model):
    mqttTopic = models.CharField(max_length=80)
    mqttValue = models.FloatField


