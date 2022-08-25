
from django.shortcuts import render
from django.http import HttpResponse
import paho.mqtt.client as mqtt
from datetime import datetime
import time
import json

def shipmotion(request):

    return render(request, 'shipmotion.html') 

def shipmotion2(request):

    return render(request, 'shipmotion2.html') 