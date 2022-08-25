from asyncio.windows_events import NULL
from email import message
from django.shortcuts import render
from django.http import HttpResponse
import json
import psycopg2

topicID={

"Gunnerus/Crane1/dp_main_cyl":1,
"Gunnerus/Crane1/extension_length_outer_boom":2,
"Gunnerus/Crane1/main_boom_angle":3,
"Gunnerus/Crane1/slewing_angle":4,
"Gunnerus/Crane1/outer_boom_angle":5,

"Gunnerus/Engine1/engine_speed":6,
"Gunnerus/Engine1/fuel_consumption":7,
"Gunnerus/Engine1/lube_oil_pressure":8,
"Gunnerus/Engine1/lube_oil_temperature":9,
"Gunnerus/Engine1/coolant_temperature":10,
"Gunnerus/Engine1/exhaust_temperature1":11,
"Gunnerus/Engine1/exhaust_temperature2":12,
"Gunnerus/Engine1/engine_load":13,
"Gunnerus/Engine1/boost_pressure":14,

"Gunnerus/Engine2/engine_speed":15,
"Gunnerus/Engine2/fuel_consumption":16,
"Gunnerus/Engine2/engine_load":17,
"Gunnerus/Engine2/lube_oil_pressure":18,
"Gunnerus/Engine2/lube_oil_temperature":19,
"Gunnerus/Engine2/coolant_temperature":20,
"Gunnerus/Engine2/exhaust_temperature1":21,
"Gunnerus/Engine2/exhaust_temperature2":22,
"Gunnerus/Engine2/boost_pressure":23,

"Gunnerus/Engine3/engine_speed":24,
"Gunnerus/Engine3/fuel_consumption":25,
"Gunnerus/Engine3/engine_load":26,
"Gunnerus/Engine3/lube_oil_pressure":27,
"Gunnerus/Engine3/lube_oil_temperature":28,
"Gunnerus/Engine3/coolant_temperature":29,
"Gunnerus/Engine3/exhaust_temperature1":30,
"Gunnerus/Engine3/exhaust_temperature2":31,
"Gunnerus/Engine3/boost_pressure":32,



"Gunnerus/SeapathGPSGga/Longitude":33,
"Gunnerus/SeapathGPSGga/Latitude":34,
"Gunnerus/SeapathGPSVtg/SpeedKmHr":35,
"Gunnerus/SeapathGPSVtg/SpeedKnots":36,
"Gunnerus/SeapathGPSVtg/CourseTrue":37,
"Gunnerus/SeapathGPSVbw/LonGroundSpeed":38,
"Gunnerus/SeapathGPSVbw/TransGroundSpeed":39,

"Gunnerus/SeapathMRU_rates/VertVel":40,
"Gunnerus/SeapathMRU_rates/RollRate":41,
"Gunnerus/SeapathMRU_rates/YawRate":42,
"Gunnerus/SeapathMRU_rates/PitchRate":43,
"Gunnerus/SeapathMRU/Heave":44,
"Gunnerus/SeapathMRU/Pitch":45,
"Gunnerus/SeapathMRU/Roll":46,
"Gunnerus/SeapathMRU/Heading":47,

"Gunnerus/WaveRadar/Total_energy_mean_direction":48,
"Gunnerus/WaveRadar/Primary_wave_peak_direction":48,
"Gunnerus/WaveRadar/Primary_wave_peak_period":50,
"Gunnerus/WaveRadar/Primary_wave_mean_direction":51,
"Gunnerus/WaveRadar/STW_east_component":52,
"Gunnerus/WaveRadar/STW_north_component":53,
"Gunnerus/WaveRadar/Significant_wave_height":54,
"Gunnerus/WaveRadar/Significant_wave_period":55,
"Gunnerus/WaveRadar/Current_speed_east_vector":56,
"Gunnerus/WaveRadar/Current_speed_north_vector":57,
"Gunnerus/WaveRadar/Total_energy_directional_spread":58,
"Gunnerus/WaveRadar/Mean_period":59,

"Gunnerus/hcx_port_mp/Power_mode_RPM_Mode":60,
"Gunnerus/hcx_port_mp/LoadFeedback":61,
"Gunnerus/hcx_port_mp/AzimuthFeedback":62,
"Gunnerus/hcx_port_mp/Running":63,
"Gunnerus/hcx_port_mp/RPMOrder":64,
"Gunnerus/hcx_port_mp/Maneuver_Transit_mode":65,
"Gunnerus/hcx_port_mp/Level_order":66,
"Gunnerus/hcx_port_mp/AzimuthOrder":67,
"Gunnerus/hcx_port_mp/RPMFeedback":68,

"Gunnerus/hcx_stbd_mp/RPMOrder":69,
"Gunnerus/hcx_stbd_mp/Running":70,
"Gunnerus/hcx_stbd_mp/Power_mode_RPM_Mode":71,
"Gunnerus/hcx_stbd_mp/LoadFeedback":72,
"Gunnerus/hcx_stbd_mp/RPMFeedback":73,
"Gunnerus/hcx_stbd_mp/AzimuthFeedback":74,
"Gunnerus/hcx_stbd_mp/AzimuthOrder":75,
"Gunnerus/hcx_stbd_mp/Maneuver_Transit_mode":76,
"Gunnerus/hcx_stbd_mp/Level_order":77,

"Gunnerus/dpThruster/FeedbackProsent":78,
"Gunnerus/dpThruster/ThrusterSetpunktProsent":79,
"Gunnerus/dpWind/Wind_Speed":80,
"Gunnerus/dpWind/Wind_Direction":81
}


def historicData(request,info):
    startTime = request.GET.get('ST')
    endTime = request.GET.get('ET')
    topic= request.GET.get('TO')
    message_recieved=searchDatabase(startTime,endTime,topic)
    historicalData = json.dumps([{'topic': topic, 'value': message_recieved}],default=str)
    return HttpResponse(historicalData,content_type='text/json')

def timelineData(request,info):
    startTime = request.GET.get('ST')
    endTime = request.GET.get('ET')
    constrain = request.GET.get('CS')
    message_recieved=TimelineData(startTime,endTime,constrain)
    #message_recieved=TimelineDatawe(startTime,endTime)
    timeline = json.dumps(message_recieved,default=str)
    return HttpResponse(timeline,content_type='text/json')

def advancedSearch (request, info):
    startTime = request.GET.get('ST')
    endTime = request.GET.get('ET')
    topic= request.GET.get('TO')
    constrain = request.Get.get('CO')
    message_recieved=advanceSearchDatabase(startTime,endTime,topic, constrain)
    historicalData = json.dumps([{'topic': topic, 'value': message_recieved}],default=str)
    return HttpResponse(historicalData,content_type='text/json')

def searchDatabase(startTime,endTime,topic):
    table_name_tem=[]
    HistoricalFiguredata=[]
    topicid=topicID[topic]
    classification="null"
    if (1<= topicid<=5):
        classification="crane"
    elif(6<=topicid<=32):
        classification="engine"
    elif (40<=topicid<=47 or 60<=topicid<=79):
        classification="shipmotion"
    elif(33<=topicid<=39 or 80<=topicid<=81):
        classification="environment"
    elif(topicid==82):
        classification="AIS"
    else:
        classification='others'

    try:
        ps_connection = psycopg2.connect(
            host='localhost',
            dbname='postgres',
            user='myuser',
            password='iot',
            port=5432)
        cursor = ps_connection.cursor()

        # get the table name
        
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.devices = '%s' """ % ( classification))
        table_name_al = cursor.fetchall()
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.start_time < '%s' and managetables.devices = '%s' """ % (startTime , classification))
        table_name_st = cursor.fetchall()[-1]
        cursor.execute("""SELECT table_name FROM managetables WHERE  '%s' < end_time and devices = '%s'""" % (endTime , classification))
        table_name_en = cursor.fetchall()
        
        if len(table_name_en)==0:
            table_name_en.append( table_name_al[-1])
        
        startIndex=-1
        endIndex=-1
        for i in range(len(table_name_al)):
            if(table_name_al[i][0]==table_name_st[0]):
                table_name_tem.append(table_name_al[i][0])
                startIndex=i
            if(startIndex!=-1 and endIndex == -1):
                table_name_tem.append(table_name_al[i][0])
            if(table_name_al[i][0]==table_name_en[0][0]):
                endIndex=i
                break
        table_name = list(set(table_name_tem))
        table_name.sort(key=table_name_tem.index)

        
        for i in range(len(table_name)):
            select_query = " SELECT topicid, value, datetime from %s" % table_name[0] + " WHERE datetime >'%s' "%startTime +" and datetime <'%s' " %endTime +" and topicid=%s "%topicid
            cursor.execute(select_query)
            temp_data = cursor.fetchall()
            HistoricalFiguredata.append(temp_data)
        

    except (Exception, psycopg2.Error) as error:
        print("Error while updating PostgreSQL table", error)

    finally:
        # closing database connection.
        if ps_connection:
            cursor.close()
            ps_connection.close()
            print("PostgreSQL connection is closed")
            return HistoricalFiguredata

def TimelineData(startTime,endTime, constrain):
    table_name_tem=[]
    timelinedata={}

    try:
        ps_connection = psycopg2.connect(
            host='localhost',
            dbname='postgres',
            user='myuser',
            password='iot',
            port=5432)
        cursor = ps_connection.cursor()

        # get the table name
        
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.devices = 'engine' """)
        table_name_al = cursor.fetchall()
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.start_time < '%s' and managetables.devices = 'engine' """ % (startTime ))
        table_name_st = cursor.fetchall()[-1]
        cursor.execute("""SELECT table_name FROM managetables WHERE  '%s' < end_time and devices = 'engine'""" % (endTime))
        table_name_en = cursor.fetchall()

        
        
        if len(table_name_en)==0:
            table_name_en.append( table_name_al[-1])
        
        startIndex=-1
        endIndex=-1
        for i in range(len(table_name_al)):
            if(table_name_al[i][0]==table_name_st[0]):
                table_name_tem.append(table_name_al[i][0])
                startIndex=i
            if(startIndex!=-1 and endIndex == -1):
                table_name_tem.append(table_name_al[i][0])
            if(table_name_al[i][0]==table_name_en[0][0]):
                endIndex=i
                break
        table_name = list(set(table_name_tem))
        table_name.sort(key=table_name_tem.index)

        currentEvent = -1
        eventNumber = 0
        temp_data=[]

        select_query = " SELECT datetime from %s" % table_name[0] + " WHERE datetime >'%s' "%startTime +" and datetime <'%s' " %endTime + "and %s"%constrain
        cursor.execute(select_query)
        constrainedDate = cursor.fetchall()
        newstarTime = constrainedDate[0][0]
        select_query = " SELECT datetime from %s" % table_name[-1] + " WHERE datetime >'%s' "%startTime +" and datetime <'%s' " %endTime + "and %s"%constrain
        cursor.execute(select_query)
        constrainedDate = cursor.fetchall()
        newEndTime = constrainedDate[-1][0]
        
        for i in range(len(table_name)):
            
            select_query = " SELECT eventcode, datetime from %s" % table_name[i] + " WHERE datetime >'%s' "%newstarTime +" and datetime <'%s' " %newEndTime
            cursor.execute(select_query)
            temp_data = cursor.fetchall()
        for i in range (len(temp_data)):
            if(currentEvent!= temp_data[i][0]):
                timelinedata[eventNumber]={
                    'event': temp_data[i][0],
                    'time':temp_data[i][1]
                    }
                currentEvent=temp_data[i][0]
                eventNumber=eventNumber+1

    except (Exception, psycopg2.Error) as error:
        print("Error while updating PostgreSQL table", error)

    finally:
        # closing database connection.
        if ps_connection:
            cursor.close()
            ps_connection.close()
            print("PostgreSQL connection is closed")
            return timelinedata

def advanceSearchDatabase(startTime,endTime,topic, constrain):
    table_name_tem=[]
    HistoricalFiguredata=[]
    topicid=topicID[topic]
    classification="null"
    if (1<= topicid<=5):
        classification="crane"
    elif(6<=topicid<=32):
        classification="engine"
    elif (40<=topicid<=47 or 60<=topicid<=79):
        classification="shipmotion"
    elif(33<=topicid<=39 or 80<=topicid<=81):
        classification="environment"
    elif(topicid==82):
        classification="AIS"
    else:
        classification='others'

    try:
        ps_connection = psycopg2.connect(
            host='localhost',
            dbname='postgres',
            user='myuser',
            password='iot',
            port=5432)
        cursor = ps_connection.cursor()

        # get the table name
        
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.devices = '%s' """ % ( classification))
        table_name_al = cursor.fetchall()
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.start_time < '%s' and managetables.devices = '%s' """ % (startTime , classification))
        table_name_st = cursor.fetchall()[-1]
        cursor.execute("""SELECT table_name FROM managetables WHERE  '%s' < end_time and devices = '%s'""" % (endTime , classification))
        table_name_en = cursor.fetchall()
        
        if len(table_name_en)==0:
            table_name_en.append( table_name_al[-1])
        
        startIndex=-1
        endIndex=-1
        for i in range(len(table_name_al)):
            if(table_name_al[i][0]==table_name_st[0]):
                table_name_tem.append(table_name_al[i][0])
                startIndex=i
            if(startIndex!=-1 and endIndex == -1):
                table_name_tem.append(table_name_al[i][0])
            if(table_name_al[i][0]==table_name_en[0][0]):
                endIndex=i
                break
        table_name = list(set(table_name_tem))
        table_name.sort(key=table_name_tem.index)

        
        for i in range(len(table_name)):
            select_query = " SELECT topicid, value, datetime from %s" % table_name[0] + " WHERE datetime >'%s' "%startTime +" and datetime <'%s' " %endTime +" and topicid=%s "%topicid +" and %s" %constrain
            cursor.execute(select_query)
            temp_data = cursor.fetchall()
            HistoricalFiguredata.append(temp_data)
        

    except (Exception, psycopg2.Error) as error:
        print("Error while updating PostgreSQL table", error)

    finally:
        # closing database connection.
        if ps_connection:
            cursor.close()
            ps_connection.close()
            print("PostgreSQL connection is closed")
            return HistoricalFiguredata


def TimelineDatawe(startTime,endTime):
    table_name_tem=[]
    timelinedata={}
    try:
        ps_connection = psycopg2.connect(
            host='localhost',
            dbname='postgres',
            user='myuser',
            password='iot',
            port=5432)
        cursor = ps_connection.cursor()

        # get the table name
        
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.devices = 'engine' """)
        table_name_al = cursor.fetchall()
        cursor.execute("""SELECT table_name FROM managetables WHERE managetables.start_time < '%s' and managetables.devices = 'engine' """ % (startTime ))
        table_name_st = cursor.fetchall()[-1]
        cursor.execute("""SELECT table_name FROM managetables WHERE  '%s' < end_time and devices = 'engine'""" % (endTime))
        table_name_en = cursor.fetchall()

        
        
        if len(table_name_en)==0:
            table_name_en.append( table_name_al[-1])
        
        startIndex=-1
        endIndex=-1
        for i in range(len(table_name_al)):
            if(table_name_al[i][0]==table_name_st[0]):
                table_name_tem.append(table_name_al[i][0])
                startIndex=i
            if(startIndex!=-1 and endIndex == -1):
                table_name_tem.append(table_name_al[i][0])
            if(table_name_al[i][0]==table_name_en[0][0]):
                endIndex=i
                break
        table_name = list(set(table_name_tem))
        table_name.sort(key=table_name_tem.index)

        currentEvent = -1
        eventNumber = 0
        temp_data=[]

        
        for i in range(len(table_name)):
            
            select_query = " SELECT eventcode, datetime from %s" % table_name[i] + " WHERE datetime >'%s' "%startTime +" and datetime <'%s' " %endTime # +"  and (topicid= 6 or topicid= 15 or topicid= 24)"
            cursor.execute(select_query)
            temp_data = cursor.fetchall()
        for i in range (len(temp_data)):
            if(currentEvent!= temp_data[i][0]):
                timelinedata[eventNumber]={
                    'event': temp_data[i][0],
                    'time':temp_data[i][1]
                    }
                currentEvent=temp_data[i][0]
                eventNumber=eventNumber+1

    except (Exception, psycopg2.Error) as error:
        print("Error while updating PostgreSQL table", error)

    finally:
        # closing database connection.
        if ps_connection:
            cursor.close()
            ps_connection.close()
            print("PostgreSQL connection is closed")
            return timelinedata
