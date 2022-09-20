"""GunnerusBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from mqttAPI import views as apiview
from frontpage import views as frontpage
from CraneRealTime import views as CraneReal
from Playback import views as Playback
from HistoricalData import views as historyicalData
from shipmotion import views as shipmotion

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',frontpage.home_view),
    path('mqtt/<path:topic>', apiview.get_mqtt),
    path('CraneControl/', CraneReal.Crane_Control),
    path('CraneReal/', CraneReal.Crane_Real),
    path('mqttrealfigure/<path:topic>', apiview.draw_data),
    path('craneRealTime/', apiview.craneRealData),
    path('playback/', Playback.historicData),
    path('historicalData/<str:info>',historyicalData.historicData),
    path('timelineData/<str:info>',historyicalData.timelineData),
    path('advanceSearch/<str:info>',historyicalData.advancedSearch),
    path('shipmotion/',shipmotion.shipmotion),
    path('shipmotion2/',shipmotion.shipmotion2)

]
