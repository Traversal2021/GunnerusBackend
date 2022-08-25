from re import M
from django.shortcuts import render
from django.http import HttpResponse
import paho.mqtt.client as mqtt
from datetime import datetime
import time
import json

from mqttAPI.mqtt import message_received

def Crane_Control(request):

    arg={}
    arg['message']= message_received
    return render(request, 'CraneControl.html',{
        'SlewingAngle': message_received['Gunnerus/Crane1/slewing_angle'],
        'OuterBoomAngle':message_received['Gunnerus/Crane1/outer_boom_angle'],
        'ExtensionLength':message_received['Gunnerus/Crane1/extension_length_outer_boom'],
        'mainBoomAngle':message_received['Gunnerus/Crane1/main_boom_angle'],   
        'C1Pressure': message_received['Gunnerus/Crane1/dp_main_cyl'],
        
        }) 

def Crane_Real(request):

    arg={}
    arg['message']= message_received
    return render(request, 'CraneReal.html',{
        'SlewingAngle': message_received['Gunnerus/Crane1/slewing_angle'],
        'OuterBoomAngle':message_received['Gunnerus/Crane1/outer_boom_angle'],
        'ExtensionLength':message_received['Gunnerus/Crane1/extension_length_outer_boom'],
        'mainBoomAngle':message_received['Gunnerus/Crane1/main_boom_angle'],   
        'C1Pressure': message_received['Gunnerus/Crane1/dp_main_cyl'],
        
        }) 