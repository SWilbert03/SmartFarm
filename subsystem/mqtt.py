import paho.mqtt.client as mqtt
from django.conf import settings

from .models import Sensor, SensorLog

def on_message_mqtt(sensor_name):
    def template(client, userdata, msg):
        sen = Sensor.objects.get(name=sensor_name)
        sen.value = msg.payload.decode('utf-8')
        sen.save()
        sen_log = SensorLog(name=sen, value=msg.payload.decode('utf-8'))
        sen_log.save()
    return template

def on_connect(client, userdata, rc, result):
    client.subscribe('smartfarm/#')


on_message_SoilMoistureSensor = on_message_mqtt('Soil Moisture Sensor')
on_message_AirTemperatureSensor = on_message_mqtt('Air Temperature Sensor')
on_message_LightIntensitySensor = on_message_mqtt('Light Intensity Sensor')

client = mqtt.Client()

#=============================================================================================

client.message_callback_add('smartfarm/soilmoisture', on_message_SoilMoistureSensor)
client.message_callback_add('smartfarm/airtemperature', on_message_AirTemperatureSensor)
client.message_callback_add('smartfarm/lightintensity', on_message_LightIntensitySensor)


client.on_connect = on_connect

client.connect(settings.MQTT_HOST, settings.MQTT_PORT)
