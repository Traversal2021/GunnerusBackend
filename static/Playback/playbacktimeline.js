//get elements 
var startTimePicker=document.getElementById('startTime');
var endTimePicker=document.getElementById('endTime');
var timePicker = document.getElementById('timeSubmit');
//var timePicker = document.getElementById('get_data');
var oneHour = document.getElementById('oneHour');
var oneDay = document.getElementById('oneDay');
var oneWeek = document.getElementById('oneWeek');
var downloadButton = document.getElementById("downloadButton");

var today = new Date().toISOString().slice(0,16);
endTimePicker.max = today;
console.log(today);

startTimePicker.addEventListener("change",(Event)=>{
  let newStartDate = new Date(startTimePicker.value);
  let tempDate = new Date(startTimePicker.value);
  let newEndDate = new Date(tempDate.setDate(tempDate.getDate()+7));
  endTimePicker.min = newStartDate.toISOString().slice(0,16);
  endTimePicker.max = newEndDate.toISOString().slice(0,16);
})

oneHour.onclick = function (){
  let nowTime = new Date();
  let newStartDate2 = new Date(nowTime.setHours(nowTime.getHours()-1));
  endTimePicker.value = new Date().toISOString().slice(0,16);
  startTimePicker.value = newStartDate2.toISOString().slice(0,16);
}

oneDay.onclick = function (){
  let nowTime = new Date();
  let newStartDate2 = new Date(nowTime.setDate(nowTime.getDate()-1));
  endTimePicker.value = new Date().toISOString().slice(0,16);
  startTimePicker.value = newStartDate2.toISOString().slice(0,16);
}

oneWeek.onclick = function (){
  let nowTime = new Date();
  let newStartDate2 = new Date(nowTime.setDate(nowTime.getDate()-7));
  endTimePicker.value = new Date().toISOString().slice(0,16);
  startTimePicker.value = newStartDate2.toISOString().slice(0,16);
}

var figureStart,figureEnd;

//timeline setting
var container = document.getElementById('visualization');
var groups = new vis.DataSet([
    {id: 3, content: 'Both'},
    {id: 2, content: 'Engine'},
    {id: 1, content: 'Crane'},
]);

var options = {
    minHeight: '100%',
    editable: true,
    orientation: 'bottom',
    // min: startTime,
    // max: endTime,
    zoomMin: 1000 * 4 * 60 ,
    margin: {
        item: 10,
        axis: 5
        }
};

// starting draw timeline
// timePicker.onclick=function(){
  // let day_month = selectedMonth+1

  // var start_H = parseInt(document.getElementById("start_hours").value);  
  // //console.log(start_H);
  // var start_minz = parseInt(document.getElementById("start_min").value);  

  // var end_H = parseInt(document.getElementById("end_hours").value); 
  // var end_minz = parseInt(document.getElementById("end_min").value);  

  //   const selected_date_element = document.querySelector('.date-picker .selected-date');
  //   var selected_date = new Date(selected_date_element.dataset.value)
  //   var selectd_date = selected_date_time.getDate()
  //   var start_hour = document.getElementById("start_hours").value
  //   var start_min = document.getElementById("start_min").value
  //   var end_hour = document.getElementById("end_hours").value
  //   var end_min = document.getElementById("end_min").value
  //   var start_time = new Date(
  //                               selected_date.getFullYear(), 
  //                               selected_date.getMonth(), 
  //                               selected_date.getDate(), 
  //                               start_hour, 
  //                               start_min
  //                               )
  // var end_time = new Date(
  //                                 selected_date.getFullYear(), 
  //                                 selected_date.getMonth(), 
  //                                 selected_date.getDate(), 
  //                                 end_hour, 
  //                                 end_min
  //                                 )
//     let startTime = startTimePicker.value;
//     let endTime = endTimePicker.value;
//     var speedConstrain = -1+"< value and value <" + 5000 + "and topicid in (6,15,24)";
//     options["min"]=startTime;
//     options["max"]=endTime;

//   //var selected_date = new Date(selected_date_element.dataset.value)
//     getTimelineData(startTime, endTime,speedConstrain);

//     //timelineMaker(startTime, endTime);

// }

function getTimelineData(startTime, endTime,constrain){
  
  console.log(startTime)
  console.log(endTime);
    var url = "http://10.24.92.185:9000/timelineData/info?ST="+ startTime+"&ET="+ endTime+ "&CS="+ constrain;

    fetch(url)
         .then(function (response) { return response.json(); })
         .then(function (data) {

            var eventNumber = Object.keys(data).length;
           
            var timelineData = [];
            for (let i =0; i<eventNumber-1; i++){
                timelineData.push({
                    id: i,
                    group: data[i]['event'],
                    start: data[i]['time'],
                    end: data[i+1]['time']
                });
            }

            timelineData.push({
                id: eventNumber-1,
                group: data[eventNumber-1]['event'],
                start: data[eventNumber-1]['time'],
                end: endTime
            });

            options["min"]=startTime;
            options["max"]=endTime;

            timelineMaker(timelineData);
              

         });
}

function timelineMaker(timelineData){
    
    var items = new vis.DataSet(timelineData);
 
    // Create a Timeline
    var timeline = new vis.Timeline(container, null, options);
    timeline.setGroups(groups);
    timeline.setItems(items);

    // Timeline events on Mouse Clicks
    timeline.on('click', function (properties) {
        for (let i =0; i<timelineData.length; i++){
            if (timelineData[i]['id']==properties['item']){
                figureStart=timelineData[i]['start'];
                figureEnd=timelineData[i]['end'];
            }
        }
    });
}

document.getElementById("searchButton").onclick=function(){
  let startTime = startTimePicker.value;
  let endTime = endTimePicker.value;
  var minSpeed = document.getElementById("minimalSpeed").value;
  var maxSpeed = document.getElementById("maxSpeed").value;
  var speedConstrain = minSpeed+"< value and value <" + maxSpeed + "and topicid in (6,15,24)";
  options["min"]=startTime;
  options["max"]=endTime;

  getTimelineData(startTime, endTime,speedConstrain);
}



CheckList = ["crane1","crane2","crane3","crane4","crane5",
              "engine1","engine2","engine3", "engine4","engine5","engine6", "engine7","engine8","engine9",
              "Enviroment1","Enviroment2","Enviroment3", "Enviroment4","Enviroment5","Enviroment6", "Enviroment7","Enviroment8",
              "ship1","ship2","ship3", "ship4","ship5","ship6", "ship7","ship8","ship9","ship10",
              "ship11","ship12","ship13", "ship14","ship15","ship16", "ship17","ship18","ship19","ship20",
              "ship21","ship22","ship23", "ship24","ship25","ship26", "ship27","ship28",
              "AIS1","AIS2","AIS3","AIS4"
            ];
var Chart1, Chart2, Chart3, Chart4, Chart5, Chart6, Chart7, Chart8, Chart9, Chart10, Chart11, Chart12, Chart13, Chart14, Chart15, Chart16;
var subTopic = {};
var selectedData = [];

document.getElementById("drawButton").onclick= function(){
  selectBox.style.display='none';
  resetBox.style.display='block';
  figureBox.style.display='block';
  document.getElementById("downloadButton").style.display = 'block';

  selectedData = [];

  var subNum=1;
  for (var prop in subTopic) {
    if (subTopic.hasOwnProperty(prop)) {
        delete subTopic[prop];
    }
}

  var title = {};
  CheckList.forEach(function (topic, index) {
      if(document.getElementById(topic).checked){
          if (subNum<=16){
              var checkedTopic= document.getElementById(topic).value;
              subTopic[checkedTopic] = subNum;
              subNum= subNum +1;
          }
      }
    });

    for (let figureNum=1; figureNum<=16; figureNum++){
      var canvasName='realTimeFigure'+figureNum;
      var canvas=document.getElementById(canvasName);
      var ctx = canvas.getContext('2d');
      var width=document.getElementById("chart1").offsetWidth;
      var height=document.getElementById("realTimeFigure1").offsetHeight;
      ctx.clearRect(0, 0, width, height);
    }
    
    getFigureData(subTopic);
  
}


resetBox.onclick=function(){
  selectBox.style.display='block';
  resetBox.style.display='none';
  figureBox.style.display='none';
  document.getElementById("downloadButton").style.display = 'none';
  selectedData = [];
  clearInterval(myInterval);
  for (let figureNum=1; figureNum<=16; figureNum++){
    var canvasName='realTimeFigure'+figureNum; 
    var canvasE= document.getElementById(canvasName);
    canvasE.style.border = "none";
    const chart = Chart.getChart(canvasName);
    
    if(chart != undefined){
      chart.destroy();
    }
  }
}

document.getElementById("downloadButton").onclick= function(){
  let csvContent = "data:text/csv;charset=utf-8,";

  selectedData.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  console.log(csvContent);
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link); // Required for FF

  link.click(); 
  
}


var myInterval=setInterval();
function getFigureData(subTopic){

    var urlHistory = "http://10.24.92.185:9000/historicalData/info?ST="+ figureStart+"&ET="+ figureEnd+"&TO=";

    

        for (const [key, value] of Object.entries(subTopic)) {
          if(key.includes("engineX")){
            topicStr = key.replace("engineX", "");
            p1=Promise.all([1, 2, 3].map(id => 
              fetch(urlHistory + `Gunnerus/Engine${id}/${topicStr}`).then(resp => resp.json())
            )).then(values => {

              selectedData.push(values);
              var canvasName='realTimeFigure'+value;
              const chart = Chart.getChart(canvasName);
              if(chart != undefined){
                chart.destroy();
              }
              
              engineDraw(values,value,key)}
            );
            
          }
          else{
            if(key.includes("AIVDM")){
              var url = urlHistory+key;
              fetch(url)
                   .then(function (response) { return response.json(); })
                   .then(function (data) { 
                    selectedData.push(data);
                    var canvasName='realTimeFigure'+value;
                    const chart = Chart.getChart(canvasName);
                    if(chart != undefined){
                      chart.destroy();
                    }

                      var yValues=[];
                      var xValues=[];
                      var mmsiList=[];
                      var unit;
                      unit='';
                      for(let i =0; i<data[0]["value"][0].length; i++){
                          yValues.push(data[0]["value"][0][i][1]);
                          xValues.push(i-data[0]["value"][0].length);
                          mmsiList.push(data[0]["value"][0][i][0]);
                      }
                      AISDraw(xValues,yValues,mmsiList, value,key,unit);
                    });

            }
            else{
              var url = urlHistory+key;
             
              fetch(url)
                   .then(function (response) { return response.json(); })
                   .then(function (data) { 
                    selectedData.push(data[0]["value"][0]);
                    
                    var canvasName='realTimeFigure'+value;
                    const chart = Chart.getChart(canvasName);
                    if(chart != undefined){
                      chart.destroy();
                    }
                     
                      var yValues=[];
                      var xValues=[];
                      var unit ="unit";
                      if(key=="Gunnerus/Crane1/dp_main_cyl"){
                        unit = "Bar";
                      }
                      for(let i =0; i<data[0]["value"][0].length; i++){
                          yValues.push(data[0]["value"][0][i][0]);
                          xValues.push(Date.parse(data[0]["value"][0][i][1]));
                      }
                      draw(xValues,yValues,value,key,unit);
                    });
            } 
          }
            
          }            
}





function engineDraw(data,figureNum,key){

  key = key.replace("engineX", "");
  var yValues=[];
  var xValues=[];
  var yValues1=[];
  var xValues1=[];
  var yValues2=[];
  var xValues2=[];
  var unit="unit";
  for(let i =0; i<data[0][0]["value"][0].length; i++){
      yValues.push(data[0][0]["value"][0][i][0]);
      xValues.push(Date.parse(data[0][0]["value"][0][i][1]));
  }
  for(let i =0; i<data[1][0]["value"][0].length; i++){
    yValues1.push(data[1][0]["value"][0][i][0]);
    xValues1.push(Date.parse(data[1][0]["value"][0][i][1]));
  }
  for(let i =0; i<data[2][0]["value"][0].length; i++){
    yValues2.push(data[2][0]["value"][0][i][0]);
    xValues2.push(Date.parse(data[2][0]["value"][0][i][1]));
  }
  
  var canvasName='realTimeFigure'+figureNum;
  var canvasE= document.getElementById(canvasName);
  canvasE.style.border = 'solid 3px rgba(119,136,153, 1)';
  canvasE.style.padding =  '20px';
  canvasE.style.border_radius= '20px';

  var ctx = document.getElementById(canvasName).getContext('2d');
  var xAxis=[];
  for(let i=0; i<xValues.length;i++){
   xAxis.push(Math.round((xValues[i]-xValues[xValues.length-1])/1000));
  }

  new Chart(ctx, {
      type: "line",
      data: {
        labels: xAxis,
        datasets: [{
          label:"engine1",
          data: yValues,
          borderColor: "#596869",
          borderWidth: 1,
          backgroundColor: '#596869',
          fill: false
        },
        {
          label:"engine2",
          data: yValues1,
          borderColor: "#B7999C",
          borderWidth: 1,
          backgroundColor: '#B7999C',
          fill: false
        },
        {
          label:"engine3",
          data: yValues2,
          borderColor: "#AAAAAA",
          borderWidth: 1,
          backgroundColor: '#AAAAAA',
          fill: false
        },]
      },
      options: {
        animation: { duration: 0 },
        plugins: {
          chartAreaBorder: {
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [5, 5],
            borderDashOffset: 2,
          },
          title: {
            display: true,
            text: key+" ("+unit+")",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: true},
        font: {size: 8},

        scales: {
          xAxis: { 
              
              ticks:{ autoSkip: true,
                maxTicksLimit: 12},
           },
          yAxis: {suggestedMin: Math.min(yValues)-1,
              suggestedMax: Math.max(yValues)+1,
            }
       }
      }
    }).update("none");

    figureNum=figureNum+1;
}

function AISDraw(xValues,yValues, mmsiList, figureNum,key,unit){
  var canvasName='realTimeFigure'+figureNum;

  var canvasName='realTimeFigure'+figureNum;
  var canvasE= document.getElementById(canvasName);
  canvasE.style.border = 'solid 3px rgba(119,136,153, 1)';
  canvasE.style.padding =  '20px';
  canvasE.style.border_radius= '20px';

  var ctx = document.getElementById(canvasName).getContext('2d');
  var AISList= uniqueArray(mmsiList);

  var linechart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
        
        font: {size: 8},
        animation: { duration: 0 },
        plugins:{
          legend: {display: false},
          chartAreaBorder: {
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [5, 5],
            borderDashOffset: 2,
          },
          title: {
            display: true,
            text: key+" ("+unit+")",
          },
        },
        scales: {
          xAxis: { 
              ticks:{ autoSkip: true,
                maxTicksLimit: 12},
           },
          yAxis: {suggestedMin: Math.min(yValues)-1,
              suggestedMax: Math.max(yValues)+1,
              gridLines: { drawBorder: false,},
              }
       }
      }
    }).update("none");

  for (let i = 0; i<5;i++){
    var newY=[];
    var newX=[];
    var tempY=0;
    for (let j=0; j<60;j++){
      if(mmsiList[j]===AISList[i]){
        tempY=yValues[j];
      }
      newY.push(tempY);

    }
    addData(linechart, AISList[i], "#AAAAAA", newY );
  }



    figureNum=figureNum+1;
}

function draw(xValues,yValues, figureNum,key,unit){
        var canvasName='realTimeFigure'+figureNum;
        var canvasName='realTimeFigure'+figureNum;
        var canvasE= document.getElementById(canvasName);
        canvasE.style.border = 'solid 3px rgba(119,136,153, 1)';
        canvasE.style.padding =  '20px';
        canvasE.style.border_radius= '20px';

        var ctx = document.getElementById(canvasName).getContext('2d');
        var xAxis=[];
        for(let i=0; i<xValues.length;i++){
         
         xAxis.push(Math.round((xValues[i]-xValues[xValues.length-1])/1000));
        }

        new Chart(ctx, {
          type: "line",
          data: {
            labels: xAxis,
            datasets: [{
              data: yValues,
                borderColor: "#AAAAAA",
                borderWidth: 1,
                backgroundColor: '#AAAAAA',
                fill: false
            },]
          },
          options: {
            animation: { duration: 0 },
            plugins: {
              legend: {display: false},
              chartAreaBorder: {
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [5, 5],
                borderDashOffset: 2,
              },
              title: {
                display: true,
                text: key+" ("+unit+")",
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            
            font: {size: 8},
    
            scales: {
              xAxis: { 
                  ticks:{ autoSkip: true,
                    maxTicksLimit: 12},
               },
              yAxis: {suggestedMin: Math.min(yValues)-1,
                  suggestedMax: Math.max(yValues)+1,
                }
           }
          }
        }).update("none");
        

          figureNum=figureNum+1;
}

function uniqueArray( ar ) {
  var j = {};

  ar.forEach( function(v) {
    j[v+ '::' + typeof v] = v;
  });


  return Object.keys(j).map(function(v){
    return j[v];
  });
} 

function addData(chart, label, color, data) {
  chart.data.datasets.push({
    label:label,
      data: data,
      borderColor: color,
      borderWidth: 1,
      backgroundColor: color,
      fill: false
  });
  chart.update("none");
}