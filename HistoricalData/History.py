import paho.mqtt.client as mqtt
from datetime import datetime
import json
from math import radians, cos, sin, asin, sqrt
import time

message_received = {}

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
"Gunnerus/dpWind/Wind_Direction":81,
"AIVDM":82
}

def updateInBulk(records):
    try:
        ps_connection = psycopg2.connect(
            host='localhost',
            dbname='postgres',
            user='myuser',
            password='iot',
            port=5432)
        cursor = ps_connection.cursor()

        # get the table name
        cursor.execute("""SELECT table_name from managetables order by id desc limit 1""")
        table_name = cursor.fetchall()[0][0]

        print("editing table is", table_name)

        # get the number of raws in the table
        cursor.execute("""SELECT count(*) from %s""" % table_name)
        row_number = cursor.fetchall()

        # if the number of raws is larger than 1,000,000, create a new table
        if (row_number[0][0] >= 1000000):
            # update the end time of last table
            end_time = str(datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'))
            sql_update_query = "update managetables set end_time='%s' where table_name = '%s' " % (end_time, table_name)
            cursor.execute(sql_update_query)

            # create a new table whose name is engineeYearMonthDay
            table_name = 'Gunnerus' + (datetime.now().strftime('%Y%m%d%H'))
            sql_create_query = """ CREATE TABLE %s(
                           id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
                           value varchar(50),
                           engineid varchar(80),
                           datetime timestamp without time zone,
                           tagname text COLLATE pg_catalog."default"
                       )""" % table_name
            cursor.execute(sql_create_query)

            # update information in the managetables
            cursor.execute(
                """insert into managetables (table_name, start_time) values('%s','%s')""" % (table_name, end_time))
            print(table_name, "new table")

        # Update multiple records
        sql_update_query = "INSERT INTO %s" % table_name + " (value, engineid,datetime, tagname) values (%s,%s,%s,%s)"
        cursor.executemany(sql_update_query, records)
        ps_connection.commit()
        row_count = cursor.rowcount
        print(row_count, "Records Updated")

    except (Exception, psycopg2.Error) as error:
        print("Error while updating PostgreSQL table", error)

    finally:
        # closing database connection.
        if ps_connection:
            cursor.close()
            ps_connection.close()
            print("PostgreSQL connection is closed")