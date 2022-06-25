import * as THREE from '/build/three.module.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
import Stats from './jsm/libs/stats.module.js';
//console.log(THREE);
//console.log(GLTFLoader);
//console.log(OrbitControls);
//console.log(GUI);
//console.log(Stats);

let scene;
let camera;
let renderer;
let house;
let model_container = document.querySelector('.web-gl');
const canvasSize = document.querySelector('.canvas-element');

const stats = new Stats();
document.body.appendChild(stats.domElement);

const init = () => {
	scene = new THREE.Scene();
	//console.log(scene);

	const fov = 45;
	const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
	const near = 0.1;
	const far = 1000;

	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	//console.log(camera);
	camera.position.set(0, 0, 25);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		canvas: model_container,
	});
	renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
	renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	renderer.autoClear = false;
	renderer.setClearColor(0x000000, 0.0);

	const controls = new OrbitControls(camera, renderer.domElement);

	const ambientLight = new THREE.AmbientLight(0x404040, 2);
	scene.add(ambientLight);

	const spotLight1 = new THREE.SpotLight(0x1d27f0, 5);
	spotLight1.position.set(6, 11, 6);
	//const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1, 0.5, 0xffffff);
	scene.add(spotLight1);
	//scene.add(spotLightHelper1);

	const spotLight2 = new THREE.SpotLight(0xf57d22, 2);
	spotLight2.position.set(-10, 0, 12);
	//const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 0.5, 0xffffff);
	scene.add(spotLight2);
	//scene.add(spotLightHelper2);

	const spotLight3 = new THREE.SpotLight(0x1d27f0, 2);
	spotLight3.position.set(-10, 18, -17);
	//const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3, 0.5, 0xffffff);
	scene.add(spotLight3);
	//scene.add(spotLightHelper3);

	const gui = new GUI();

	const blueLight = gui.addFolder('BlueLight');
	blueLight.add(spotLight1.position, 'x', -30, 30, 1);
	blueLight.add(spotLight1.position, 'y', -30, 30, 1);
	blueLight.add(spotLight1.position, 'z', -30, 30, 1);

	const orangeLight = gui.addFolder('OrangeLight');
	orangeLight.add(spotLight2.position, 'x', -40, 40, 1);
	orangeLight.add(spotLight2.position, 'y', -40, 40, 1);
	orangeLight.add(spotLight2.position, 'z', -40, 40, 1);

	const backLight = gui.addFolder('BackLight');
	backLight.add(spotLight3.position, 'x', -40, 40, 1);
	backLight.add(spotLight3.position, 'y', -40, 40, 1);
	backLight.add(spotLight3.position, 'z', -40, 40, 1);

	const loader = new GLTFLoader();
	loader.load('./model/scene.gltf', gltf => {
		house = gltf.scene.children[0];
		house.scale.set(2.5, 2.5, 2.5);
		house.position.set(-2, -1.3, 0);
		house.rotation.x = Math.PI / -2.5;
		scene.add(gltf.scene);
	});

	animate();
};

const render = () => {
	renderer.render(scene, camera);
};

let step = 0;

const animate = () => {
	requestAnimationFrame(animate);
	step += 0.02;
	house.position.y = 2 * Math.abs(Math.sin(step));
	house.rotation.y = Math.sin(step) * Math.abs(Math.cos(step / 3) / 4);

	render();
	stats.update();
};

const windowResize = () => {
	camera.aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
	render();
};

window.addEventListener('resize', windowResize, false);
window.onload = init();
