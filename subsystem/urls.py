from django.urls import path

from . import views

urlpatterns = [
    path('', views.DashboardView.as_view()),

    path('smartfarm/soilmoisture', views.SoilMoistureSensorView.as_view()),
    path('smartfarm/airtemperature', views.AirTemperatureSensorView.as_view()),
    path('smartfarm/lightintensity', views.LightIntensitySensorView.as_view()),
    path('actuator/automaticirrigation', views.AutomaticIrrigationview.as_view()),
    
    path('sensorlog/latest', views.LatestSensorLogView.as_view()),
]