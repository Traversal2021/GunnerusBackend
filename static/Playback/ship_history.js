      
          var calender_click = 0
      
          var tele_length_list = []
          var main_boom_list = []
          var outer_boom_angle_list = []
          var slewing_angle_list = []
      
          var list_length
      
          var play_count = 0
      
          var Play_tele_length_list = [10]
          var Play_main_boom_list = [10]
          var Play_outer_boom_angle_list = [10]
          var Play_slewing_angle_list = [10]
      
          var playback_speed = 1000
      
      
          folow = 0
          play = 0
          var pos = []
          var marker69 = 0
          var lattitude_g = 0
          var longitude_g = 0
          var heading_g = 0 
          var info = 0
          line_into = true
          var line_press_counter = 0
          function linto(){
          }
      
          let popup = document.getElementById("popup");
      
          function openPop(){
              if (info == 1){
                  document.getElementById("infotext").innerHTML=("The Intelligent Systems Lab is focused on connect the state of the art research on robotics and mechatronics to the students at NTNU and diverse projects with key partners at the Norwegian Industry. The maritime industry is deeply rooted in Norwegian national economics and traditions. ")
                  document.getElementById("labind").innerHTML=("Intelligent Systems Lab")
              }
              if (info == 2){
                  document.getElementById("infotext").innerHTML=("the Gunnurs ship")
              }
              if (info == 0){
                  document.getElementById("infotext").innerHTML=("Please select the action from the oprtions button")
              }
      
              popup.classList.add("open-popup");
          }
      
          function closePop(){
              popup.classList.remove("open-popup");
      
          }
      
      
      
      
          function ISL_pop_open(){
      
              document.getElementById("infotext").innerHTML=("The Intelligent Systems Lab is focused on connect the state of the art research on robotics and mechatronics to the students at NTNU and diverse projects with key partners at the Norwegian Industry. The maritime industry is deeply rooted in Norwegian national economics and traditions. ")
              document.getElementById("labind").innerHTML=("Intelligent Systems Lab")
              popup.classList.add("open-popup");
      
          }
      
      
      
          let popup_date = document.getElementById("popup2");
      
          function closePop2(){
              popup_date.classList.remove("open-popuppp");
              closebtn()
      
          }
      
      
          function date_pop_open(){
      
              document.getElementById("infotext").innerHTML=("Enter The Date and Time")
              document.getElementById("labind").innerHTML=("Please confrim")
              popup_date.classList.add("open-popuppp");
      
              btn_pop_open()
              slider_pop_open()
      
          }
      
      
      
      
      
          let popup_btn = document.getElementById("popupbtn");
      
          function closebtn(){
              popup_btn.classList.remove("open-popupppx");
      
          }
      
      
          function btn_pop_open(){
      
              document.getElementById("infotext").innerHTML=("Enter The Date and Time")
              document.getElementById("labind").innerHTML=("Please confrim")
              popup_btn.classList.add("open-popupppx");
              popup_btn.classList.add("open-popupppx_slider");
      
          }
      
      
      
          let popup_slider = document.getElementById("popupslider");
      
          function close_slider(){
              popup_slider.classList.remove("open-popupppx");
      
          }
      
      
          function slider_pop_open(){
      
              popup_slider.classList.add("open-popupppx_slider");
      
          }
      
      
      
          var toggled = false;
          function toggle(){
              if(!toggled){
                  toggled = true;
                  //document.getElementById("fly").style.display = "none";
                  return;
              }
              if(toggled){
                  toggled = false;
              }
          }
      
      
          var find_g = 0
      
          function ship_onmap(){
              find_g += 1
              //console.log(find_g)
              ship_oo(find_g)
          }
      
          function ntnu_home(){
              info = 1
              map.flyTo({
              center: [6.234787, 62.470916] ,
              zoom: 18,
              bearing: 0,
              // These options control the flight curve, making it move
              // slowly and zoom out almost completely before starting
              // to pan.
              speed: 0.4, // make the flying slow
              curve: 1, // change the speed at which it zooms out
              // This can be any easing function: it takes a number between
              // 0 and 1 and returns another number between 0 and 1.
              easing: (t) => t,
              // this animation is considered essential with respect to prefers-reduced-motion
              essential: true
              });
          }
      
          function find_boat(){
      
              info = 1
              map.flyTo({
              center: [6.179522, 62.457598],
              zoom: 18,
              bearing: 0,
              
              // These options control the flight curve, making it move
              // slowly and zoom out almost completely before starting
              // to pan.
              speed: 0.4, // make the flying slow
              curve: 1, // change the speed at which it zooms out
              
              // This can be any easing function: it takes a number between
              // 0 and 1 and returns another number between 0 and 1.
              easing: (t) => t,
              
              // this animation is considered essential with respect to prefers-reduced-motion
              essential: true
              });
          }
      
      
          
          function find_crane(){
              info = 1
              map.flyTo({
              center: [longitude_g,lattitude_g],
              zoom: 20.3,
              bearing: heading_g,
              pitch: 50,
              
              // These options control the flight curve, making it move
              // slowly and zoom out almost completely before starting
              // to pan.
              speed: 0.4, // make the flying slow
              curve: 1, // change the speed at which it zooms out
              
              // This can be any easing function: it takes a number between
              // 0 and 1 and returns another number between 0 and 1.
              easing: (t) => t,
              
              // this animation is considered essential with respect to prefers-reduced-motion
              essential: true
              });
          }
      
        //   const date_picker_element = document.querySelector('.date-picker');
        //   const selected_date_element = document.querySelector('.date-picker .selected-date');
        //   const dates_element = document.querySelector('.date-picker .dates');
        //   const mth_element = document.querySelector('.date-picker .dates .month .mth');
        //   const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
        //   const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
        //   const days_element = document.querySelector('.date-picker .dates .days');
      
        //   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
        //   let date = new Date();
        //   let day = date.getDate();
        //   let month = date.getMonth();
        //   let year = date.getFullYear();
      
        //   let selectedDate = date;
        //   let selectedDay = day;
        //   let selectedMonth = month;
        //   let selectedYear = year;
      
        //   mth_element.textContent = months[month] + ' ' + year;
      
        //   selected_date_element.textContent = formatDate(date);
        //   selected_date_element.dataset.value = selectedDate;
      
          
      
        //   populateDates();
      
        //   // EVENT LISTENERS
        //   date_picker_element.addEventListener('click', toggleDatePicker);
        //   next_mth_element.addEventListener('click', goToNextMonth);
        //   prev_mth_element.addEventListener('click', goToPrevMonth);
      
          // FUNCTIONS
          function toggleDatePicker (e) {
              if (!checkEventPathForClass(e.path, 'dates')) {
                  dates_element.classList.toggle('active');
              }
          }
      
          function goToNextMonth (e) {
              month++;
              if (month > 11) {
                  month = 0;
                  year++;
              }
              mth_element.textContent = months[month] + ' ' + year;
              populateDates();
          }
      
          function goToPrevMonth (e) {
              month--;
              if (month < 0) {
                  month = 11;
                  year--;
              }
              mth_element.textContent = months[month] + ' ' + year;
              populateDates();
          }
      
        //   function populateDates (e) {
        //       days_element.innerHTML = '';
        //       let amount_days = 31;
      
        //       if (month == 1) {
        //           amount_days = 28;
        //       }
      
        //       for (let i = 0; i < amount_days; i++) {
        //           const day_element = document.createElement('div');
        //           day_element.classList.add('day');
        //           day_element.textContent = i + 1;
      
        //           if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
        //               day_element.classList.add('selected');
        //           }
      
        //           day_element.addEventListener('click', function () {
        //               selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
        //               selectedDay = (i + 1);
        //               selectedMonth = month;
        //               selectedYear = year;
      
        //               selected_date_element.textContent = formatDate(selectedDate);
        //               selected_date_element.dataset.value = selectedDate;
      
        //               populateDates();
        //           });
      
        //           days_element.appendChild(day_element);
        //       }
        //   }
      
          // HELPER FUNCTIONS
          function checkEventPathForClass (path, selector) {
              for (let i = 0; i < path.length; i++) {
                  if (path[i].classList && path[i].classList.contains(selector)) {
                      return true;
                  }
              }
              
              return false;
          }
          function formatDate (d) {
              let day = d.getDate();
              if (day < 10) {
                  day = '0' + day;
              }
      
              let month = d.getMonth() + 1;
              if (month < 10) {
                  month = '0' + month;
              }
      
              let year = d.getFullYear();
      
              return day + ' / ' + month + ' / ' + year;
          }
      
      
      
      const start = [6.179522, 62.457598];
      
      //const end = [lattitude_g, longitude_g];
      
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpcmFuYSIsImEiOiJjbDFxaWFxbTMxa2V2M2pvMmY2ZDdlZWlsIn0.c50jduV_DHhrogk1sSia7g';
      const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: start,
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true,
      hideCompass: true,
      attributionControl: false
      });
      
      
      const lab_location = [6.233763, 62.470963];
      var description = '<h2> Intelligent System Lab</h2>  For more information please click <button onclick="ISL_pop_open()"> info</button>'
      const popup0 = new mapboxgl.Popup({ offset: 25 }).setHTML(description);
      const el = document.createElement('div');
      el.id = 'marker';
      new mapboxgl.Marker(el)
      .setLngLat(lab_location)
      .setPopup(popup0) 
      .addTo(map);
      
      
      
      var jarray = [];
      
      let isAtStart = true;
      let water, DoubleLink1, DoubleLink2,d1,d2,d3,YawSupport1,LoadCellHook,d5,Tele11,Tele2,Tele3;
      
      
      // Live data Fetach
      
      const api_url = 'http://127.0.0.1:5000/';
      
      let firstTime = true;
      
      async function getISS(){
      
      
          if (play == true) {
      
              console.log('play')
              console.log('play_count')
              console.log(play_count)
      
              Play_tele_length_list.push(tele_length_list[play_count])
              Play_main_boom_list.push(main_boom_list[play_count])
              Play_outer_boom_angle_list.push(outer_boom_angle_list[play_count])
              Play_slewing_angle_list.push(slewing_angle_list[play_count])
      
              //console.log('counted_list_play')
      
              //console.log(logged_array_boom)
              //console.log(Play_main_boom_list)
              //console.log(Play_outer_boom_angle_list)
              //console.log(Play_slewing_angle_list)
      
      
              if (pause == true) {
      
                  play_count +=0
              }
              else {
                  play_count +=1
      
              }
      
      
          }
          else{
              play_count = 0
          }
      
          //console.log(selectedDay);
      
        //const response = await fetch(api_url);
        //const data = await response.json();
        //latitude = (data.crane.lat);
        //longitude = (data.crane.lon);
          //head = (data.crane.head);
          let long 
          let lati 
      
      
        //ld = Math.floor(longitude /100);
        //long = ld + (longitude - ld*100)/60;
        //console.log(long)
      
        //lt = Math.floor(latitude /100);
        //lati = lt + (latitude - lt*100)/60;
        //console.log(lati)
      
        //lattitude_g = lati;
        //longitude_g = long;
          //heading_g  = head;
      
          //move_ship(6.179522, 62.457598, head)
          //update_lat_long_global(6.179522, 62.457598, head)
          //ship_marker_update(6.179522, 62.457598)
          //getcentermap()
      
      
          if (folow % 2){
          onLoadConfigPress()
          }
      
          //pos.push(lati)
          //console.log(long)
      
          //ship_marker_update(lattitude_g, longitude_g)
      
      
          main_boom_calib = -25
          outer_boom_calib = 60
          slewing_ang_calib = -194
          extension_calib = 1800
      
          //double_link1_data = parseFloat(data2.crane.double_link1) 
          //double_link2_data = parseFloat(data2.crane.double_link2 ) 
          //yaw_support_data = parseFloat(data2.crane.yaw_support ) 
      
          //tele_data =  parseFloat(data2.crane.tele) - extension_calib
      
          console.log('playback_speed')
      
          console.log(playback_speed)
      
          
      
      
      }
      
      function update_lat_long_global(long, lati,headi){
      
          lattitude_g = lati;
          longitude_g = long;
          heading_g = headi;
      }
      
      let main_boom_calib, outer_boom_calib, slewing_ang_calib, extension_calib
      
      var modelOrigin = [62.443774, 6.015649];
      var modelOrigin2 = [6.179522, 62.457598];
      
      
      
      const modelAltitude = 3;
      const modelRotate = [Math.PI / 2, 0, 0];
       
      var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin2,
      modelAltitude
      );
      
      getISS();
      setInterval(getISS, playback_speed);
      
      
      function shortAngleDist(a0,a1) {
          var max = Math.PI*2;
          var da = (a1 - a0) % max;
          return 2*da % max - da;
      }
      
      function angleLerp(a0,a1,t) {
          return a0 + shortAngleDist(a0,a1)*t;
      }
      
      function degrees_to_radians(degrees){
          
          var pi = Math.PI;
          return degrees * (pi/180);
      }
       
      // transformation parameters to position, rotate and scale the 3D model onto the map
      var modelTransform = {
              translateX: modelAsMercatorCoordinate.x,
              translateY: modelAsMercatorCoordinate.y,
              translateZ: modelAsMercatorCoordinate.z,
              rotateX: modelRotate[0],
              rotateY: modelRotate[1],
              rotateZ: modelRotate[2],
              /* Since our 3D model is in real world meters, a scale transform needs to be
               * applied since the CustomLayerInterface expects units in MercatorCoordinates.
               */
              scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
          };
      
      const THREE = window.THREE;
      
      var customLayer = {
              id: '3d-model',
              type: 'custom',
              renderingMode: '3d',
              onAdd: function(map, gl) {
                  this.camera = new THREE.Camera();
                  this.scene = new THREE.Scene();
                  // create two three.js lights to illuminate the model
      
                  const ambientLight = new THREE.AmbientLight( 0xcccccc );
                  this.scene.add( ambientLight );
      
      
      
                  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
                  hemiLight.position.set( 0, 500, 1000 );
                  //this.scene.add( hemiLight );
      
                  const dirLight = new THREE.DirectionalLight( 0xffffff );
                  dirLight.position.set( 0, 900, 1500 );
                  dirLight.castShadow = true;
                  dirLight.shadow.camera.top = 2;
                  dirLight.shadow.camera.bottom = - 2;
                  dirLight.shadow.camera.left = - 2;
                  dirLight.shadow.camera.right = 2;
                  dirLight.shadow.camera.near = 0.1;
                  dirLight.shadow.camera.far = 40;
                  this.scene.add( dirLight );
      
      
                  const dirLight2 = new THREE.DirectionalLight( 0xffffff );
                  dirLight2.position.set( 0, 900, -1500 );
                  dirLight2.castShadow = true;
                  dirLight2.shadow.camera.top = 2;
                  dirLight2.shadow.camera.bottom = - 2;
                  dirLight2.shadow.camera.left = - 2;
                  dirLight2.shadow.camera.right = 2;
                  dirLight2.shadow.camera.near = 0.1;
                  dirLight2.shadow.camera.far = 40;
                  this.scene.add( dirLight2 );
      
                  const dirLight3 = new THREE.DirectionalLight( 0xffffff );
                  dirLight3.position.set( 0, 900, 0 );
                  dirLight3.castShadow = true;
                  dirLight3.shadow.camera.top = 2;
                  dirLight3.shadow.camera.bottom = - 2;
                  dirLight3.shadow.camera.left = - 2;
                  dirLight3.shadow.camera.right = 2;
                  dirLight3.shadow.camera.near = 0.1;
                  dirLight3.shadow.camera.far = 40;
                  this.scene.add( dirLight3 );
      
                  // use the three.js GLTF loader to add the 3D model to the three.js scene
                  var loader = new THREE.GLTFLoader();
                  loader.load("../shipmotion/models/gltf/assembly.glb",function(gltf) {
                      model = gltf.scene;
                      this.scene.add(model);
                      DoubleLink1 = model.getObjectByName( 'DoubleLink1' );
                      DoubleLink2 = model.getObjectByName( 'DoubleLink2' );
                      YawSupport1 = model.getObjectByName( 'YawSupport1' );
                      LoadCellHook = model.getObjectByName( 'LoadCellHook' );
                      Tele11 = model.getObjectByName( 'Tele11' );
                      Tele2 = model.getObjectByName( 'Tele2' );
                      Tele3 = model.getObjectByName( 'Tele3' );
                      Tele4 = model.getObjectByName( 'Tele4' );
                      Tele5 = model.getObjectByName( 'Tele5' );
                      Tele6 = model.getObjectByName( 'Tele6' );
                      Tele7 = model.getObjectByName( 'Tele7' );
      
      
                      async function set_crane(){
      
                          //const response2 = await fetch(api_url);
                        //const data2 = await response2.json();
      
      
      
                          if (play == true) {
      
      
                              play_list_length_iz = Play_tele_length_list.length
                              console.log('Length Determined by crane func')
                              console.log(play_list_length_iz)
      
      
      
                              console.log('-----------------------------------')
      
      
                              console.log('Play_tele_length_list:')
                              console.log(Play_tele_length_list[play_list_length_iz-1])
      
                              console.log('Play_main_boom_list:')
                              console.log(Play_main_boom_list[play_list_length_iz-1])
      
                              console.log('Play_outer_boom_angle_list:')
                              console.log(Play_outer_boom_angle_list[play_list_length_iz-1])
      
                              console.log('Play_slewing_angle_list:')
                              console.log(Play_slewing_angle_list[play_list_length_iz-1])
      
                              console.log('-----------------------------------')
      
                              exten_outer = Play_tele_length_list[play_list_length_iz-1]
                              double_link1_data = Play_main_boom_list[play_list_length_iz-1]
                              double_link2_data = -Play_outer_boom_angle_list[play_list_length_iz-1]
                              yaw_support_data = Play_slewing_angle_list[play_list_length_iz-1]
      
                          } 
                          else{
      
      
                              exten_outer = 48
                              double_link1_data = -3
                              double_link2_data = -177
                              yaw_support_data = 194
      
                          }
      
      
                          console.log('+++++++++++++++++++++++++++++')
                          //console.log(logged_array_boom)
      
      
      
      
      
      
      
      
      
                          //double_link1_data = 48//parseFloat(data2.crane.double_link1 )
                          //double_link2_data = 33//parseFloat(data2.crane.double_link2 ) - double_link1_data
                          //yaw_support_data = 90//parseFloat(data2.crane.yaw_support )
      
                          //console.log( yaw_support_data)
                          if (yaw_support_data == 'None'){
                              yaw_support_data = 0;
                          }
      
      
                          tele_data =  -(1800 - exten_outer * 10)-480
      
                          let double_link1_angle, double_link2_angle, YawSupport1_angle
      
                          double_link1_angle = double_link1_data
      
                          double_link2_angle = double_link2_data + double_link1_angle
      
                          YawSupport1_angle = +yaw_support_data + slewing_ang_calib
      
      
                          DoubleLink1.rotation.set(0,degrees_to_radians(double_link1_angle),0)
                          DoubleLink2.rotation.set(0,degrees_to_radians(-double_link2_angle),0)
                          YawSupport1.rotation.set(0,0,degrees_to_radians(YawSupport1_angle))
                          LoadCellHook.position.set( 1000000,10000000,1000000)
      
      
                          Tele11.position.set( tele_data,0,0)
                          Tele2.position.set( tele_data,0,0)
                          Tele3.position.set( tele_data,0,0)
                          Tele4.position.set( tele_data * 1.1,0,0)
                          Tele5.position.set( tele_data * 1.1,0,0)
                          Tele6.position.set( tele_data * 1.2,0,0)
                          Tele7.position.set( tele_data * 1.2,0,0)
      
                      }
                      set_crane()
                      setInterval(set_crane, playback_speed)
                      }.bind(this)
                  );
                  this.map = map;
                  // use the Mapbox GL JS map canvas for three.js
                  this.renderer = new THREE.WebGLRenderer({
                      canvas: map.getCanvas(),
                      context: gl,
                      antialias: true
                  });
                  this.renderer.autoClear = false;
              },
      
              
      
              render: function(gl, matrix) {
                  var rotationX = new THREE.Matrix4().makeRotationAxis(
                      new THREE.Vector3(1, 0, 0),
                      modelTransform.rotateX
                  );
                  var rotationY = new THREE.Matrix4().makeRotationAxis(
                      new THREE.Vector3(0, 1, 0),
                      modelTransform.rotateY
                  );
                  var rotationZ = new THREE.Matrix4().makeRotationAxis(
                      new THREE.Vector3(0, 0, 1),
                      modelTransform.rotateZ
                  );
                  var m = new THREE.Matrix4().fromArray(matrix);
                  var l = new THREE.Matrix4()
                      .makeTranslation(
                          modelTransform.translateX,
                          modelTransform.translateY,
                          modelTransform.translateZ
                      )
                      .scale(
                          new THREE.Vector3(
                              modelTransform.scale,
                              -modelTransform.scale,
                              modelTransform.scale
                          )
                      )
                      .multiply(rotationX)
                      .multiply(rotationY)
                      .multiply(rotationZ);
                  this.camera.projectionMatrix = m.multiply(l);
                  this.renderer.state.reset();
                  this.renderer.render(this.scene, this.camera);
                  this.map.triggerRepaint();
              }
      
      
          };
       
      map.on('style.load', () => {
      map.addLayer(customLayer, 'waterway-label');
      });
      
      
      
      function ship_marker_update(latt_m, longi_m){
          marker_remove()
      
          var ship_location = [latt_m , longi_m];
          var description2 = '<h2> Intelligent System Lab</h2>  For more information please click <button onclick="ISL_pop_open()"> info</button>'
          var popup1 = new mapboxgl.Popup({ offset: 25 }).setHTML(description2);
          var el1 = document.createElement('div');
          el1.id = 'marker2';
          //new mapboxgl.Marker(el1).setLngLat(ship_location).setPopup(popup1).addTo(map);
      
          marker69 = new mapboxgl.Marker(el1).setLngLat(ship_location).setPopup(popup1).addTo(map);
      
      }
      
      const lat_list = [] // a
      const lon_list = [] // b
      
      var route_list = []
      
      
      //console.log(jarray)
      
      
      function learp1(start, end, t){
          return start *(1-t)+ end*t;
      }
      
      
      
      
      function move_ship(latip, longp, headp){
      
          
      
          modelAltitudep = -3;
      
          lat_list.push(latip);
          lon_list.push(longp);
      
          last_lati1 = lat_list[lat_list.length-1]
          last_lati2 = lat_list[lat_list.length-3]
      
          last_long1 = lon_list[lon_list.length-1]
          last_long2 = lon_list[lon_list.length-3]
      
          lati_inter = learp1(last_lati2,last_lati1,100);
          longi_inter = learp1(last_long2,last_long1,100);
      
          for (var i=0; i<lat_list.length && i<lon_list.length; i++){
              jarray.push([lon_list[i], lat_list[i]])
          }
      
          route_list.push([longp,latip])
      
          //console.log(route_list)
          //console.log(jarray)
      
      
      
          modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
                  [6.179522,62.457598],
                  modelAltitudep
               );
               // transformation parameters to position, rotate and scale the 3D model onto the map
               modelTransform = {
                  translateX: modelAsMercatorCoordinate.x,
                  translateY: modelAsMercatorCoordinate.y,
                  translateZ: modelAsMercatorCoordinate.z,
                  rotateX: Math.PI / 2,
                  rotateY: (-headp+90) * (Math.PI/180),
                  rotateZ: modelRotate[2],
                  /* Since our 3D model is in real world meters, a scale transform needs to be
                  * applied since the CustomLayerInterface expects units in MercatorCoordinates.
                  */
                  scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
               };
      
      }
      
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, 'bottom-right');
      
      
       
      map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;
      
       
      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
      {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
      'fill-extrusion-color': '#aaa',
       
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
      ],
      'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.9
      }
      },
      labelLayerId
      );
      });
      
      map.on('load', () => {
      map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 15
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
       
      // add a sky layer that will show when the map is highly pitched
      
      map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
      'sky-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0,
      0,
      5,
      0.3,
      8,
      1
      ],
      // set up the sky layer for atmospheric scattering
      'sky-type': 'atmosphere',
      // explicitly set the position of the sun rather than allowing the sun to be attached to the main light source
      'sky-atmosphere-sun': getSunPosition(),
      // set the intensity of the sun as a light source (0-100 with higher values corresponding to brighter skies)
      'sky-atmosphere-sun-intensity': 5
      }
      });
      });
      
      // update the `sky-atmosphere-sun` paint property with the position of the sun based on the selected time
      // the position of the sun is calculated using the SunCalc library
      function updateSunPosition(sunPos) {
      map.setPaintProperty('sky', 'sky-atmosphere-sun', sunPos);
      }
       
      // Get list of SunCalc's default sun positions
      // for the current time and location
      const sunPositions = SunCalc.getTimes(
      Date.now(),
      map.getCenter().lat,
      map.getCenter().lng
      );
      // set up event listeners for the buttons to update
      // the position of the sun for times of the day
      const sunTimeLabels = document.querySelectorAll(
      '#inputs input',
      '#getlocal'
      );
      for (const label of sunTimeLabels) {
      label.addEventListener('click', () => {
      const sunPos =
      label.id === 'getlocal'
      ? getSunPosition(new Date())
      : getSunPosition(sunPositions[label.id]);
      updateSunPosition(sunPos);
      });
      }
       
      function getSunPosition(date) {
      const center = map.getCenter();
      const sunPos = SunCalc.getPosition(
      date || Date.now(),
      center.lat,
      center.lng
      );
      const sunAzimuth = 180 + (sunPos.azimuth * 180) / Math.PI;
      const sunAltitude = 90 - (sunPos.altitude * 180) / Math.PI;
      return [sunAzimuth, sunAltitude];
      }
      
      
      
      
      
      let menuToggle = document.querySelector('.toggle');
      let menu = document.querySelector('.menu');
      menuToggle.onclick = function(){
          menu.classList.toggle('active')
          menuToggle.classList.toggle('active')
      }
      
      const list = document.querySelectorAll('li');
      function activeLink(){
          list.forEach((item) =>
          item.classList.remove('active'));
          this.classList.add('active')
      }
      list.forEach((item)=>
      item.addEventListener('click',activeLink)
      )
      
      function marker_remove(){
          if (marker69!==0) {
          marker69.remove();
      
      }
      }
      
      
      var main_map_lat = 6.149482
      var main_map_lon = 62.472229
      
      function getcentermap(){
          const centerpos = map.getCenter();
          //console.log(centerpos.lng)
          main_map_lat = centerpos.lat
          main_map_lon = centerpos.lng
      }
      
      
      map.on("load", function () {
              getcentermap()
          map.addControl(new mapboxgl.Minimap({
              center: [ 6.149482,62.472229],
              zoom: 8,
              zoomLevels: []
            }), 'bottom-left');
          });
      
      
      
      //setInterval(marker_remove,300)
      
      // Mini Map
      
      
      function Minimap ( options )
      {
        Object.assign(this.options, options);
      
        this._ticking = false;
        this._lastMouseMoveEvent = null;
        this._parentMap = null;
        this._isDragging = false;
        this._isCursorOverFeature = false;
        this._previousPoint = [0, 0];
        this._currentPoint = [0, 0];
        this._trackingRectCoordinates = [[[], [], [], [], []]];
      }
      
      
      
      Minimap.prototype = Object.assign({}, mapboxgl.NavigationControl.prototype, {
      
        options: {
          id: "mapboxgl-minimap",
          width: "320px",
          height: "180px",
          style: "mapbox://styles/mapbox/satellite-streets-v11",
          center: [0, 0],
          zoom: 6,
      
          // should be a function; will be bound to Minimap
          zoomAdjust: null,
      
          // if parent map zoom >= 18 and minimap zoom >= 14, set minimap zoom to 16
          zoomLevels: [
            [18, 14, 16],
            [16, 12, 14],
            [14, 10, 12],
            [12, 8, 10],
            [10, 6, 8]
          ],
      
          lineColor: "#08F",
          lineWidth: 1,
          lineOpacity: 1,
      
          fillColor: "#F80",
          fillOpacity: 0.25,
      
          dragPan: true,
          scrollZoom: true,
          boxZoom: false,
          dragRotate: false,
          keyboard: false,
          doubleClickZoom: false,
          touchZoomRotate: false
        },
      
        onAdd: function ( parentMap )
        {
          this._parentMap = parentMap;
      
          var opts = this.options;
          var container = this._container = this._createContainer(parentMap);
          var miniMap = this._miniMap = new mapboxgl.Map({
            attributionControl: false,
            container: container,
            style: opts.style,
            zoom: opts.zoom,
            center: opts.center
          });
      
          if (opts.maxBounds) miniMap.setMaxBounds(opts.maxBounds);
      
          miniMap.on("load", this._load.bind(this));
      
          return this._container;
        },
      
        _load: function ()
        {
          var opts = this.options;
          var parentMap = this._parentMap;
          var miniMap = this._miniMap;
          var interactions = [
            "dragPan", "scrollZoom", "boxZoom", "dragRotate",
            "keyboard", "doubleClickZoom", "touchZoomRotate"
          ];
      
          interactions.forEach(function(i){
            if( opts[i] !== true ) {
              miniMap[i].disable();
            }
          });
      
          if( typeof opts.zoomAdjust === "function" ) {
            this.options.zoomAdjust = opts.zoomAdjust.bind(this);
          } else if( opts.zoomAdjust === null ) {
            this.options.zoomAdjust = this._zoomAdjust.bind(this);
          }
      
          var bounds = miniMap.getBounds();
      
          this._convertBoundsToPoints(bounds);
      
          miniMap.addSource("trackingRect", {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {
                "name": "trackingRect"
              },
              "geometry": {
                "type": "Polygon",
                "coordinates": this._trackingRectCoordinates
              }
            }
          });
      
          miniMap.addLayer({
            "id": "trackingRectOutline",
            "type": "line",
            "source": "trackingRect",
            "layout": {},
            "paint": {
              "line-color": opts.lineColor,
              "line-width": opts.lineWidth,
              "line-opacity": opts.lineOpacity
            }
          });
      
          // needed for dragging
          miniMap.addLayer({
            "id": "trackingRectFill",
            "type": "fill",
            "source": "trackingRect",
            "layout": {},
            "paint": {
              "fill-color": opts.fillColor,
              "fill-opacity": opts.fillOpacity
            }
          });
      
          this._trackingRect = this._miniMap.getSource("trackingRect");
      
          this._update();
      
          parentMap.on("move", this._update.bind(this));
      
          miniMap.on("mousemove", this._mouseMove.bind(this));
          miniMap.on("mousedown", this._mouseDown.bind(this));
          miniMap.on("mouseup", this._mouseUp.bind(this));
      
          miniMap.on("touchmove", this._mouseMove.bind(this));
          miniMap.on("touchstart", this._mouseDown.bind(this));
          miniMap.on("touchend", this._mouseUp.bind(this));
      
          this._miniMapCanvas = miniMap.getCanvasContainer();
          this._miniMapCanvas.addEventListener("wheel", this._preventDefault);
          this._miniMapCanvas.addEventListener("mousewheel", this._preventDefault);
        },
      
        _mouseDown: function ( e )
        {
          if( this._isCursorOverFeature )
          {
            this._isDragging = true;
            this._previousPoint = this._currentPoint;
            this._currentPoint = [e.lngLat.lng, e.lngLat.lat];
          }
        },
      
        _mouseMove: function (e)
        {
          this._ticking = true;
      
          var miniMap = this._miniMap;
          var features = miniMap.queryRenderedFeatures(e.point, {
            layers: ["trackingRectFill"]
          });
      
          // don't update if we're still hovering the area
          if( ! (this._isCursorOverFeature && features.length > 0) )
          {
            this._isCursorOverFeature = features.length > 0;
            this._miniMapCanvas.style.cursor = this._isCursorOverFeature ? "move" : "";
          }
      
          if( this._isDragging )
          {
            this._previousPoint = this._currentPoint;
            this._currentPoint = [e.lngLat.lng, e.lngLat.lat];
      
            var offset = [
              this._previousPoint[0] - this._currentPoint[0],
              this._previousPoint[1] - this._currentPoint[1]
            ];
      
            var newBounds = this._moveTrackingRect(offset);
      
            this._parentMap.fitBounds(newBounds, {
              duration: 80,
              noMoveStart: true
            });
          }
        },
      
        _mouseUp: function ()
        {
          this._isDragging = false;
          this._ticking = false;
        },
      
        _moveTrackingRect: function ( offset )
        {
          var source = this._trackingRect;
          var data = source._data;
          var bounds = data.properties.bounds;
      
          bounds._ne.lat -= offset[1];
          bounds._ne.lng -= offset[0];
          bounds._sw.lat -= offset[1];
          bounds._sw.lng -= offset[0];
      
          this._convertBoundsToPoints(bounds);
          source.setData(data);
      
          return bounds;
        },
      
        _setTrackingRectBounds: function ( bounds )
        {
          var source = this._trackingRect;
          var data = source._data;
      
          data.properties.bounds = bounds;
          this._convertBoundsToPoints(bounds);
          source.setData(data);
        },
      
        _convertBoundsToPoints: function ( bounds )
        {
          var ne = bounds._ne;
          var sw = bounds._sw;
          var trc = this._trackingRectCoordinates;
      
          trc[0][0][0] = ne.lng;
          trc[0][0][1] = ne.lat;
          trc[0][1][0] = sw.lng;
          trc[0][1][1] = ne.lat;
          trc[0][2][0] = sw.lng;
          trc[0][2][1] = sw.lat;
          trc[0][3][0] = ne.lng;
          trc[0][3][1] = sw.lat;
          trc[0][4][0] = ne.lng;
          trc[0][4][1] = ne.lat;
        },
      
        _update: function ( e )
        {
          if( this._isDragging  ) {
            return;
          }
      
          var parentBounds = this._parentMap.getBounds();
      
          this._setTrackingRectBounds(parentBounds);
      
          if( typeof this.options.zoomAdjust === "function" ) {
            this.options.zoomAdjust();
          }
        },
      
        _zoomAdjust: function ()
        {
          var miniMap = this._miniMap;
          var parentMap = this._parentMap;
          var miniZoom = parseInt(miniMap.getZoom(), 10);
          var parentZoom = parseInt(parentMap.getZoom(), 10);
          var levels = this.options.zoomLevels;
          var found = false;
      
          levels.forEach(function(zoom)
          {
            if( ! found && parentZoom >= zoom[0] )
            {
              if( miniZoom >= zoom[1] ) {
                miniMap.setZoom(zoom[2]);
              }
      
              miniMap.setCenter(parentMap.getCenter());
              found = true;
            }
          });
      
          if( ! found && miniZoom !== this.options.zoom )
          {
            if( typeof this.options.bounds === "object" ) {
              miniMap.fitBounds(this.options.bounds, {duration: 50});
            }
      
            miniMap.setZoom(this.options.zoom)
          }
        },
      
        _createContainer: function ( parentMap )
        {
          var opts = this.options;
          var container = document.createElement("div");
      
          container.className = "mapboxgl-ctrl-minimap mapboxgl-ctrl";
          container.setAttribute('style', 'width: ' + opts.width + '; height: ' + opts.height + ';');
          container.addEventListener("contextmenu", this._preventDefault);
      
          parentMap.getContainer().appendChild(container);
      
          if( opts.id !== "" ) {
            container.id = opts.id;
          }
      
          return container;
        },
      
        _preventDefault: function ( e ) {
          e.preventDefault();
        }
      });
      
      mapboxgl.Minimap = Minimap;
      
      
      
      //setInterval(draw_route,1000)
      
      
      
      
      
      
      
      
      rt_ary = [[5.489611966666667, 62.29872561666666],
              [5.489611966666667, 62.29872561666666],
              [5.489537216666667, 62.29886478333333],
              [5.489537216666667, 62.29886478333333],
              [5.489537216666667, 62.29886478333333],
              [5.489515866666666, 62.29891084999999],
              [5.48949685, 62.29895666666666],
              [5.489478766666667, 62.299003899999995],
              [5.489461616666667, 62.2990516],
              [5.489447516666667, 62.29909825],
              [5.489447516666667, 62.29909825],
              [5.48943495, 62.299144516666665],]
      
      
      
      //console.log(jarray)
      
      
      
      
      function draw_route(){
      
          map.on('load', () => {
          map.addSource('route', {'type': 'geojson',
          'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': route_list,
          }
          }
          });
          map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
          'line-join': 'round',
          'line-cap': 'round'
          },
          'paint': {
          'line-color': '#888',
          'line-width': 8
          }
          });
          });
      
      
      }
      
      
      //console.log(route_list)
      
      
      
      given_data = {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': route_list,
          }
      }
      
      
      map.on('load', async () =>  {
      map.addSource('route', {'type': 'geojson', data: given_data
      
          });
      
      
      map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
          'line-join': 'round',
          'line-cap': 'round'
          },
          'paint': {
          'line-color': '#7fff00',
          'line-width': 5
          }
          });
      
      
      
      // on a regular basis, add more coordinates from the saved list and update the map
      
      
      });
      
      function update_line(){
      
          map.getSource('route').setData(given_data);
          map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
          map.setPitch(30);
      
          
      }
      
      //setInterval(update_line,1000)
      
      
      
      
      
      
      function onLoadConfigPress() {
          map.flyTo({
              center: [longitude_g, lattitude_g] ,
              
              // These options control the flight curve, making it move
              // slowly and zoom out almost completely before starting
              // to pan.
              speed: 1.0, // make the flying slow
              curve: 1, // change the speed at which it zooms out
              
              // This can be any easing function: it takes a number between
              // 0 and 1 and returns another number between 0 and 1.
              easing: (t) => t,
              
              // this animation is considered essential with respect to prefers-reduced-motion
              essential: true
              });
      }
      
      
      
      
      function follow_camera(){
      
          folow = true
      
      }
      
      function play_true(){
      
          play = true
          pause = false
      
      }
      
      function stop_true(){
      
          play = false
      
      }
      
      function pause_true(){
      
          pause = true
      
      }
      
      
      function speed_incr(){
      
      
          if(play == true){
              console.log('play is true')
              playback_speed = 500
          }
          else{
              console.log('play is flase')
          }
      
      
      }
      
      function speed_decr(){
      
          if(play == true){
              console.log('play is true')
              playback_speed = 2000
          }
          else{
              console.log('play is flase')
          }
      
      
      }
      
      
      
      
      
      function getVal() {
        const val9 = document.getElementById("start_hours").value
        console.log(val9);
      }
      
      function calenderpop() {
      
          if(calender_click % 2 == 0){
              closePop2()
          }
          else{
              date_pop_open()
          }
      
          calender_click+=1
      
      }
      
      
      async function fetch_data() {
      
          console.log(selectedDay)
          console.log(selectedMonth)
          console.log(selectedYear)
      
      
          let day_month = selectedMonth+1
      
          var start_H = parseInt(document.getElementById("start_hours").value);  
          //console.log(start_H);
          var start_minz = parseInt(document.getElementById("start_min").value);  
      
          var end_H = parseInt(document.getElementById("end_hours").value); 
          var end_minz = parseInt(document.getElementById("end_min").value);  
      
          const historical_api_boom = "http://10.24.92.185:9000/historicalData/info?ST="+selectedYear+"-"+day_month+"-"+selectedDay+"%20"+start_H+":"+start_minz+":36.680000&ET="+selectedYear+"-"+day_month+"-"+selectedDay+"T"+end_H+":"+end_minz+"&TO=Gunnerus/Crane1/extension_length_outer_boom"
          const mainboom_api_boom = "http://10.24.92.185:9000/historicalData/info?ST="+selectedYear+"-"+day_month+"-"+selectedDay+"%20"+start_H+":"+start_minz+":36.680000&ET="+selectedYear+"-"+day_month+"-"+selectedDay+"T"+end_H+":"+end_minz+"&TO=Gunnerus/Crane1/main_boom_angle"
          const outer_boom_angle_api_boom = "http://10.24.92.185:9000/historicalData/info?ST="+selectedYear+"-"+day_month+"-"+selectedDay+"%20"+start_H+":"+start_minz+":36.680000&ET="+selectedYear+"-"+day_month+"-"+selectedDay+"T"+end_H+":"+end_minz+"&TO=Gunnerus/Crane1/outer_boom_angle"
          const slewing_angle_api_boom = "http://10.24.92.185:9000/historicalData/info?ST="+selectedYear+"-"+day_month+"-"+selectedDay+"%20"+start_H+":"+start_minz+":36.680000&ET="+selectedYear+"-"+day_month+"-"+selectedDay+"T"+end_H+":"+end_minz+"&TO=Gunnerus/Crane1/slewing_angle"
      
          console.log(historical_api_boom)
      
          // Boom
      
          const hist_response = await fetch(historical_api_boom);
          const his_data = await hist_response.json();
          let logged_array_boom = his_data[0].value[0]
          let length_boom = logged_array_boom.length;
      
      
          console.log('extension_length_outer_boom - oooooooo')
          console.log(his_data[0].value[0])
          console.log('extension_length_outer_boom')
          console.log(length_boom)
          //console.log(his_data[0].value[0][0][1])
      
          tele_length_list.push(his_data[0].value[0][0][1])
          console.log(tele_length_list)
      
          for (var i = 0; i < length_boom; i++) {
      
              tele_length_list.push(his_data[0].value[0][i][1])
      
          }
      
          list_length = length_boom + 1;
      
      
          const mainboom_response = await fetch(mainboom_api_boom);
          const mainboom_data = await mainboom_response.json();
      
          let logged_main_boom = mainboom_data[0].value[0]
          let length_main_boom = logged_main_boom.length;
      
      
          console.log('main_boom_angle')
          console.log(length_main_boom)
          console.log(mainboom_data[0].value[0][0][1])
      
          main_boom_list.push(mainboom_data[0].value[0][0][1])
          console.log(main_boom_list)
      
          for (var i = 0; i < length_main_boom; i++) {
              
              main_boom_list.push(mainboom_data[0].value[0][i][1])
      
          }
      
      
      
          const outer_boom_angle_response = await fetch(outer_boom_angle_api_boom);
          const outer_boom_angle_data = await outer_boom_angle_response.json();
      
          let logged_outer_boom_angle = outer_boom_angle_data[0].value[0]
          let length_outer_boom_angle = logged_outer_boom_angle.length;
      
      
          console.log('outer_boom_angle')
          console.log(length_outer_boom_angle)
          console.log(outer_boom_angle_data[0].value[0][0][1])
      
          outer_boom_angle_list.push(outer_boom_angle_data[0].value[0][0][1])
          console.log(outer_boom_angle_list)
      
          for (var i = 0; i < length_outer_boom_angle; i++) {
              
              outer_boom_angle_list.push(outer_boom_angle_data[0].value[0][i][1])
      
          }
          
      
          const slewing_angle_response = await fetch(slewing_angle_api_boom);
          const slewing_angle_data = await slewing_angle_response.json();
      
          let logged_slewing_angle = slewing_angle_data[0].value[0]
          let length_slewing_angle = logged_slewing_angle.length;
      
      
          console.log('slewing_angle')
      
          console.log(length_slewing_angle)
          console.log(slewing_angle_data[0].value[0][0][1])
      
          slewing_angle_list.push(slewing_angle_data[0].value[0][0][1])
          console.log(slewing_angle_list)
      
          for (var i = 0; i < length_slewing_angle; i++) {
              
              slewing_angle_list.push(slewing_angle_data[0].value[0][i][1])
      
          }
      }
      