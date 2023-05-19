from django.shortcuts import render
from django.views.generic import View
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response

import joblib
from machinelearning import mlmodel

from .models import Sensor, SensorLog, Actuator

class SensorTemplateView(APIView):
    sensor_name = ""
    def get(self, request, format=None):
        sensor = Sensor.objects.get(name=self.sensor_name)
        data = {
            "value": sensor.value
        }
        return Response(data)

class ActuatorTemplateView(APIView):
    actuator_name = ""
    sensor1_name  = ""
    sensor2_name  = ""
    sensor3_name  = ""
    training_csv  = ""
    def get(self, request, format=None):
        actuator = Actuator.objects.get(name=self.actuator_name)
        sensor1  = Sensor.objects.get(name=self.sensor1_name)
        sensor2  = Sensor.objects.get(name=self.sensor2_name)
        sensor3  = Sensor.objects.get(name=self.sensor3_name)
        model = mlmodel.BaseLinearRegression(settings.ML_ROOT + self.training_csv)
        prediction = model.predict([float(sensor1.value), float(sensor2.value), float(sensor3.value)])
        actuator.state = int(prediction)
        actuator.save()
        data = {
            "state": actuator.state
        }
        return Response(data)

class ActuatorTemplateSystemView(APIView):
    actuator_name = ""
    actuatorsubsystem1  = ""
    actuatorsubsystem2  = ""
    actuatorsubsystem3  = ""
    training_csv  = ""
    def get(self, request, format=None):
        actuator = Actuator.objects.get(name=self.actuator_name)
        actuatorsubsystem1 = Actuator.objects.get(name=self.actuatorsubsystem1)
        actuatorsubsystem2 = Actuator.objects.get(name=self.actuatorsubsystem2)
        actuatorsubsystem3 = Actuator.objects.get(name=self.actuatorsubsystem3)
        model = mlmodel.BaseLinearRegression(settings.ML_ROOT + self.training_csv)
        prediction = model.predict([float(actuatorsubsystem1.state), float(actuatorsubsystem2.state), float(actuatorsubsystem3.state)])
        actuator.state = int(prediction)
        actuator.save()
        data = {
            "state": actuator.state
        }
        return Response(data)

class DashboardView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html')
    
# Smart Farm ==========================================================================================================================================
class SoilMoistureSensorView(SensorTemplateView):
    sensor_name = "Soil Moisture Sensor"
    
class AirTemperatureSensorView(SensorTemplateView):
    sensor_name = "Air Temperature Sensor"

class LightIntensitySensorView(SensorTemplateView):
    sensor_name = "Light Intensity Sensor"
    
class AutomaticIrrigationview(ActuatorTemplateView):
    actuator_name = "Automatic Irrigation"
    sensor1_name = "Soil Moisture Sensor"
    sensor2_name = "Air Temperature Sensor"
    sensor3_name = "Light Intensity Sensor"
    training_csv = "AutomaticIrrigation.csv"