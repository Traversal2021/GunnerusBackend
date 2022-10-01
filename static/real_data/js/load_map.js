mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpcmFuYSIsImEiOiJjbDFxaWFxbTMxa2V2M2pvMmY2ZDdlZWlsIn0.c50jduV_DHhrogk1sSia7g';

function degrees_to_radians(degrees){ return degrees * (Math.PI/180); }

const api_url = 'http://10.24.92.185:9000/ShipPositionRealTime/';
export var map;
async function InitializePage(){
    const response = await fetch(api_url);
    const data = await response.json();
    var latitude = (data[0].ShipPosition.lat);
    var longitude = (data[0].ShipPosition.lon);
    var head = (data[0].ShipPosition.head);

    let ld = Math.floor(longitude /100);
    let lt = Math.floor(latitude /100);

    let lattitude_g = lt + (latitude - lt*100)/60;
    let longitude_g = ld + (longitude - ld*100)/60;;
    let heading_g  = head;

    const modelRotate = [Math.PI/2, (-heading_g+90) * (Math.PI/180), 0];
    var modelOrigin2 = [longitude_g,lattitude_g]; 
    const modelAltitude = 3;

    var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin2,
        modelAltitude
    );

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

    const slewing_ang_calib = -194;
    map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: modelOrigin2,
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true,
        hideCompass: true,
        attributionControl: false
    });

    let water, DoubleLink1, DoubleLink2,d1,d2,d3,YawSupport1,LoadCellHook,d5;
    let Tele11,Tele2,Tele3,Tele4,Tele5,Tele6,Tele7;

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
                console.log(model_path)
                loader.load(model_path,function(gltf) {
                    var model = gltf.scene;
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
                        let exten_outer = 48
                        let double_link1_data = -3
                        let double_link2_data = -177
                        let yaw_support_data = 194

                        let tele_data =  -(1800 - exten_outer * 10)-480

                        let double_link1_angle = double_link1_data

                        let double_link2_angle = double_link2_data + double_link1_angle

                        let YawSupport1_angle = +yaw_support_data + slewing_ang_calib

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
    
    map.on('style.load', () => { map.addLayer(customLayer, 'waterway-label'); });

    return
}

InitializePage();

