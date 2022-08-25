from re import M
from django.shortcuts import render
from django.http import HttpResponse
import paho.mqtt.client as mqtt
from datetime import datetime
import time
import json

from mqttAPI.mqtt import message_received

def home_view(request):

    arg={}
    arg['message']= message_received
    return render(request, 'index.html',{
        'SlewingAngle': message_received['Gunnerus/Crane1/slewing_angle'],
        'OuterBoomAngle':message_received['Gunnerus/Crane1/outer_boom_angle'],
        'ExtensionLength':message_received['Gunnerus/Crane1/extension_length_outer_boom'],
        'mainBoomAngle':message_received['Gunnerus/Crane1/main_boom_angle'],
        'C1Pressure': message_received['Gunnerus/Crane1/dp_main_cyl'],
        'engine1speed':message_received['Gunnerus/Engine1/engine_speed'],
        'engine1fuel':message_received['Gunnerus/Engine1/fuel_consumption'],
        'engine1load':message_received['Gunnerus/Engine1/engine_load'],
        'engine1lubepressure':message_received['Gunnerus/Engine1/lube_oil_pressure'],
        'engine1lubetem':message_received['Gunnerus/Engine1/lube_oil_temperature'],
        'engine1cooltem':message_received['Gunnerus/Engine1/coolant_temperature'],
        'engine1temp1':message_received['Gunnerus/Engine1/exhaust_temperature1'],
        'engine1temp2':message_received['Gunnerus/Engine1/exhaust_temperature2'],
        'engine1pressure':message_received['Gunnerus/Engine1/boost_pressure'],
        'engine2speed':message_received['Gunnerus/Engine2/engine_speed'],
        'engine2fuel':message_received['Gunnerus/Engine2/fuel_consumption'],
        'engine2load':message_received['Gunnerus/Engine2/engine_load'],
        'engine2lubepressure':message_received['Gunnerus/Engine2/lube_oil_pressure'],
        'engine2lubetem':message_received['Gunnerus/Engine2/lube_oil_temperature'],
        'engine2cooltem':message_received['Gunnerus/Engine2/coolant_temperature'],
        'engine2temp1':message_received['Gunnerus/Engine2/exhaust_temperature1'],
        'engine2temp2':message_received['Gunnerus/Engine2/exhaust_temperature2'],
        'engine2pressure':message_received['Gunnerus/Engine2/boost_pressure'],
        'engine3speed':message_received['Gunnerus/Engine3/engine_speed'],
        'engine3fuel':message_received['Gunnerus/Engine3/fuel_consumption'],
        'engine3load':message_received['Gunnerus/Engine3/engine_load'],
        'engine3lubepressure':message_received['Gunnerus/Engine3/lube_oil_pressure'],
        'engine3lubetem':message_received['Gunnerus/Engine3/lube_oil_temperature'],
        'engine3cooltem':message_received['Gunnerus/Engine3/coolant_temperature'],
        'engine3temp1':message_received['Gunnerus/Engine3/exhaust_temperature1'],
        'engine3temp2':message_received['Gunnerus/Engine3/exhaust_temperature2'],
        'engine3pressure':message_received['Gunnerus/Engine3/boost_pressure'],   
       
        'thrusterfeed':message_received['Gunnerus/dpThruster/FeedbackProsent'],
        'thrusterset':message_received['Gunnerus/dpThruster/ThrusterSetpunktProsent'],

        'wavetotal':message_received['Gunnerus/WaveRadar/Total_energy_mean_direction'],
        'wavepeak':message_received['Gunnerus/WaveRadar/Primary_wave_peak_direction'],
        'waveprimrypeak':message_received['Gunnerus/WaveRadar/Primary_wave_peak_period'],
        'waveprimarymean':message_received['Gunnerus/WaveRadar/Primary_wave_mean_direction'],
        'waveeast': message_received['Gunnerus/WaveRadar/STW_east_component'],
        'wavenorth':message_received['Gunnerus/WaveRadar/STW_north_component'],
        'waveheight':message_received['Gunnerus/WaveRadar/Significant_wave_height'],
        'waveperiod':message_received['Gunnerus/WaveRadar/Significant_wave_period'],
        'wavespeedeast':message_received['Gunnerus/WaveRadar/Current_speed_east_vector'],
        'wavespeednorth':message_received['Gunnerus/WaveRadar/Current_speed_north_vector'],
        'waveenergy':message_received['Gunnerus/WaveRadar/Total_energy_directional_spread'],
        'wavemeanperiod':message_received['Gunnerus/WaveRadar/Mean_period'],

        'longitude':message_received['Gunnerus/SeapathGPSGga/Longitude'],
        'latitude':message_received['Gunnerus/SeapathGPSGga/Latitude'],
        'speedkmhr':message_received['Gunnerus/SeapathGPSVtg/SpeedKmHr'],
        'speedknots':message_received['Gunnerus/SeapathGPSVtg/SpeedKnots'],
        'coursetrue':message_received['Gunnerus/SeapathGPSVtg/CourseTrue'],
        'longroundspeed':message_received['Gunnerus/SeapathGPSVbw/LonGroundSpeed'],
        'transgroundspeed':message_received['Gunnerus/SeapathGPSVbw/TransGroundSpeed'],

        'windspeed':message_received['Gunnerus/dpWind/Wind_Speed'],
        'winddirection':message_received['Gunnerus/dpWind/Wind_Direction'],

        

        
        }) 