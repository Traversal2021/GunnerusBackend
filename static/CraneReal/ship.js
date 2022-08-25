
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { Water } from './jsm/objects/Water.js';

let scene, renderer, camera, stats;
let model, mixer, clock;
let water, DoubleLink1, DoubleLink2,d1,d2,d3,YawSupport1,LoadCellHook,d5,Tele11,Tele2,Tele3;
let Tele4,Tele5,Tele6,Tele7,s1,s2,s3;

let double_link1_data;
let double_link2_data;
let yaw_support_data;
let load_cell_hook_data;
let tele_data;

const api_url = 'http://10.24.92.185:9000/craneRealTime/';


async function getiss(){

   const response = await fetch(api_url);
   const data = await response.json();
   //console.log(data[0].crane.double_link1);
   //console.log(data[0].crane.double_link2);
   //console.log(data[0].crane.yaw_support);
   //console.log(data[0].crane.tele);

   double_link1_data = data[0].crane.double_link1
   double_link2_data = -data[0].crane.double_link2
   yaw_support_data = data[0].crane.yaw_support
   if (yaw_support_data == 'None'){
    yaw_support_data = 0;
   }
   tele_data = data[0].crane.tele - 2000

   DoubleLink1.rotation.set(0,degrees_to_radians(double_link1_data),0)
   DoubleLink2.rotation.set(0,degrees_to_radians(double_link2_data),0)
   YawSupport1.rotation.set(0,0,degrees_to_radians(yaw_support_data))
   Tele11.position.set( tele_data,0,0)
   Tele2.position.set( tele_data,0,0)
   Tele3.position.set( tele_data,0,0)
   Tele4.position.set( tele_data,0,0)
   Tele5.position.set( tele_data,0,0)
   Tele6.position.set( tele_data,0,0)
   Tele7.position.set( tele_data,0,0)


}

function degrees_to_radians(degrees){
    
    var pi = Math.PI;
    return degrees * (pi/180);
    }

const parameters2 = {
        x:0,
        y:0,
        Speed:0,
        Rudder_Angle:0,
    };


const parameters = {
    elevation: 2,
    azimuth: 180,
};


const parameters3 = {
    Double_Link_1: -56,
    Double_Link_2: -153,
    Yaw_Support_1:0,
    Load_Cell_Hook:0,
    Tele:-2100,
};

const parameters4 = {
    Yaw: 0,
    Pitch: 0,
    Roll:0,
};



const params = {
    minScale: 10,
    maxScale: 20,
    Live_Data: false,
    clear: function () {

        homepos();

    }
};



const allActions = [];
const baseActions = {
    Full_Ship: { weight: 1 },
    Engine: { weight: 0 },
    Propeller: { weight: 0 }
};
const additiveActions = {
    Base_Joint: { weight: 0 },
    Second_Joint: { weight: 0 },
    Third_Joint: { weight: 0 },
    Boom_Length: { weight: 0 }
};
let panelSettings, numAnimations,light1,light2,light3;


let pox1 = additiveActions.Base_Joint.weight	


init();


function init() {



    const container = document.getElementById( 'container' );
    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 20, 100 );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 3, 10, 10 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add( dirLight );

    // ground

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 5, 5 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    // Water

    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( '/static/CraneReal/textures/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add( water );

    const loader = new GLTFLoader();
    let d1, d1r;
    loader.load( '/static/CraneReal/models/gltf/assembly.glb', function ( gltf ) {
        model = gltf.scene;
        model.position.set(8 ,pox1-3.5,1)
        scene.add( model );
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

        DoubleLink1.rotation.set(0,degrees_to_radians(-56),0)
        DoubleLink2.rotation.set(0,degrees_to_radians(-153),0)
        LoadCellHook.quaternion.set(0,0,0,0)
        LoadCellHook.setRotationFromQuaternion(1.0472)
        Tele11.position.set(-2100,0,0)
        Tele2.position.set(-2100,0,0)
        Tele3.position.set(-2100,0,0)
        Tele4.position.set(-2100,0,0)
        Tele5.position.set(-2100,0,0)
        Tele6.position.set(-2100,0,0)
        Tele7.position.set(-2100,0,0)


        model.traverse( function ( object ) {

            if ( object.isMesh ) object.castShadow = true;


        } );

        const animations = gltf.animations;
        mixer = new THREE.AnimationMixer( model );
        numAnimations = animations.length;

        for ( let i = 0; i !== numAnimations; ++ i ) {

            let clip = animations[ i ];
            const name = clip.name;

            if ( baseActions[ name ] ) {

                const action = mixer.clipAction( clip );
                activateAction( action );
                baseActions[ name ].action = action;
                allActions.push( action );

            } else if ( additiveActions[ name ] ) {

                // Make the clip additive and remove the reference frame

                THREE.AnimationUtils.makeClipAdditive( clip );

                if ( clip.name.endsWith( '_pose' ) ) {

                    clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );

                }

                const action = mixer.clipAction( clip );
                activateAction( action );
                additiveActions[ name ].action = action;
                allActions.push( action );

            }

        }

        //createPanel();

        animate();
        //lights();

    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );

    // camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( -10, 40, 40 );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.target.set( 0, 0, 0 );
    controls.update();

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize );


}

function set_yaw(){
    s1 = parameters4.Yaw
    s2 = parameters4.Pitch
    s3 = parameters4.Roll

    model.rotation.set(degrees_to_radians(s3),degrees_to_radians(s1),degrees_to_radians(s2))
}


function set_base_ang(){
    d1 = parameters3.Double_Link_1
    if(!params.Live_Data){
        DoubleLink1.rotation.set(0,degrees_to_radians(d1),0)
    }
}

function set_base_ang2(){
    d2 = parameters3.Double_Link_2
    if(!params.Live_Data){
        DoubleLink2.rotation.set(0,degrees_to_radians(d2),0)
    }
}

function set_base_ang3(){
    d3 = parameters3.Yaw_Support_1
    if(!params.Live_Data){
        YawSupport1.rotation.set(0,0,degrees_to_radians(d3))
    }
}

function set_base_ang4(){
    d4 = parameters3.Load_Cell_Hook
    LoadCellHook.quaternion.set(0,0,0,0);
    LoadCellHook.setRotationFromQuaternion(1.0472)
}


function set_tele1(){
    d5 = parameters3.Tele
    if(!params.Live_Data){
        Tele11.position.set(d5,0,0)
        Tele2.position.set(d5,0,0)
        Tele3.position.set(d5,0,0)
        Tele4.position.set(d5,0,0)
        Tele5.position.set(d5,0,0)
        Tele6.position.set(d5,0,0)
        Tele7.position.set(d5,0,0)  
    }

}

function homepos() {

    parameters3.Double_Link_1 = -53
    parameters3.Double_Link_2= -153,
    parameters3.Yaw_Support_1 = 0,
    parameters3.Load_Cell_Hook = 0,
    parameters3.Tele = -2100,
    set_base_ang()
    set_base_ang2()
    set_base_ang3()
    set_base_ang4()
    set_tele1()

    }

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    // Render loop

    requestAnimationFrame( animate );

    for ( let i = 0; i !== numAnimations; ++ i ) {

        const action = allActions[ i ];
        const clip = action.getClip();
        const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
        settings.weight = action.getEffectiveWeight();

    }

    // Get the time elapsed since the last frame, used for mixer update

    const mixerUpdateDelta = clock.getDelta();

    // Update the animation mixer, the stats panel, and render this frame

    mixer.update( mixerUpdateDelta );

    stats.update();

    getiss();
    

    renderer.render( scene, camera );
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

}