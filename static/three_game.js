import * as THREE from './three.js/build/three.module.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene()

var light = new THREE.SpotLight();
light.position.set(5, 5, 5)
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

function setup_model(data) {
  const model = data.scene.children[0];

  return model;
}

async function load_model() {
  const loader = new GLTFLoader();

  const rocket_data = await loader.loadAsync('./static/pixel_art_rocket.glb');

  console.log('rocket!',rocket_data);

  const rocket = setup_model(rocket_data);

  return { rocket }

}

async function init(){
    const { rocket } = await load_model();
    return rocket
}

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('canvas');

  // create a new world
  const world = new World(container);

  // complete async tasks
  await world.init();

  // start the animation loop
  //world.start();

}

main().catch((err) => {
  console.error(err);
});


main().catch((err) => {
  console.error(err);
});



/*

const loader = new GLTFLoader()

var model = loader.load(
    './static/pixel_art_rocket.glb',
    function (gltf) {
       //model = gltf.scene
        scene.add(gltf.scene);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
        console.log(error);
    }

);


var xSpeed = 0.0001;
var ySpeed = 0.0001;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        model.position.y += ySpeed;
    } else if (keyCode == 83) {
        model.position.y -= ySpeed;
    } else if (keyCode == 65) {
        model.position.x -= xSpeed;
    } else if (keyCode == 68) {
        model.position.x += xSpeed;
    } else if (keyCode == 32) {
        model.position.set(0, 0, 0);
    }
};

*/

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}



var animate = function () {
    requestAnimationFrame(animate)

    render()

};

function render() {
    renderer.render(scene, camera)
}
animate();





