from django.shortcuts import render
from django.http import HttpResponse
from .mqtt import message_received, real_time_data
import json

def get_mqtt(request,topic):
    mqttTopic= topic
    response=json.dumps([{'topic': mqttTopic, 'value': message_received[mqttTopic]}])
    return HttpResponse(response,content_type='text/json')

def draw_data (request, topic):
    mqttTopic = topic
    mqttData = json.dumps([{'topic': mqttTopic, 'value': real_time_data[mqttTopic]}])
    return HttpResponse(mqttData,content_type='text/json')

def craneRealData(request):
    craneData = json.dumps([{'crane':  {
        "double_link1": message_received["Gunnerus/Crane1/main_boom_angle"], 
        "double_link2": message_received["Gunnerus/Crane1/outer_boom_angle"], 
        "yaw_support": message_received["Gunnerus/Crane1/slewing_angle"], 
        "load_cell_hook": message_received["Gunnerus/Crane1/extension_length_outer_boom"], 
        "tele": message_received["Gunnerus/Crane1/extension_length_outer_boom"], 
        "lat": message_received["Gunnerus/SeapathGPSGga/Latitude"], 
        "lon": message_received["Gunnerus/SeapathGPSGga/Longitude"], 
        "heave": message_received["Gunnerus/SeapathMRU/Heave"], 
        "head": message_received["Gunnerus/SeapathMRU/Heading"],
        }}])

    return HttpResponse(craneData,content_type='text/json')

def ShipPositionRealTime(request):
    PositionData = json.dumps([{'ShipPosition':  { 
        "lat": message_received["Gunnerus/SeapathGPSGga/Latitude"], 
        "lon": message_received["Gunnerus/SeapathGPSGga/Longitude"],
        "head": message_received["Gunnerus/SeapathMRU/Heading"], 
        }}])

    return HttpResponse(PositionData,content_type='text/json')