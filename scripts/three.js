import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const chickens = [
    {
        "path": "leo",
        "bg": 0x6b6a6a,
        "deg": 90,
        "up": 5.5,
        "campos": [1.4, 1, 0.7]
    },
    {
        "path": "cluck_norris",
        "bg": 0x1d81d8,
        "deg": 170,
        "up": -100,
        "campos": [370, 3, 250]
    },
    {
        "path": "destroyer_of_worlds",
        "bg": 0xaab32d,
        "campos": [110, 0, 0],
        "deg": 100,
        "up": 3.5
    },
    {
        "path": "jeff",
        "bg": 0x00a3b7,
        "deg": 100,
        "up": 5.5,
        "campos": [0, 0, 7]
    },
    {
        "path": "chickira",
        "bg": 0x68493e,
        "deg": 40,
        "up": 10,
        "campos": [150, 0, 500]
    },
    {
        "path": "eggward",
        "bg": 0xbec832,
        "deg": 90,
        "up": 3.5,
        "campos": [6, 0, 3]
    },
    {
        "path": "ducktor_who",
        "bg": 0x1d81d8,
        "deg": -10,
        "campos": [15, 3, 10]
    },
    {
        "path": "oleggvia",
        "bg": 0x502d96,
        "deg": -90,
        "up": 5.4,
        "campos": [0, 0, 2]
    },
];

/**
 * Renders a 3D model in the given container.
 * @param {string} model 
 * @param {HTMLElement} container 
 */
function render3D(model, container, chicken) {
    let isPaused = false;
    let pauseTimeout;

    const scene = new THREE.Scene();
    //scene.background = new THREE.Color(0x1d81d8);
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(chicken.campos[0], chicken.campos[1], chicken.campos[2]);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(chicken.bg, 1);
    renderer.domElement.setAttribute("x-show", "image == 0");
    renderer.domElement.classList.add("rounded-xl");
    console.log(container.clientWidth);
    renderer.setSize(container.clientWidth, container.clientWidth);
    container.children[0].setAttribute("x-show", "image == 1");
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 0, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight3.position.set(0, 5, 0);
    scene.add(directionalLight3);

    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight4.position.set(0, 0, 5);
    scene.add(directionalLight4);
    chickens
    const directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight5.position.set(5, 0, 0);
    scene.add(directionalLight5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = chicken.campos[0] - 5;
    controls.maxDistance = chicken.campos[0] + 35;
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new GLTFLoader();
    loader.load(model, function (gltf) {
        gltf.scene.rotation.y = THREE.MathUtils.degToRad(chicken.deg);
        gltf.scene.position.y = -5.5 + (chicken.up ? chicken.up : 0);
        scene.add(gltf.scene);
        render();
        let clock = new THREE.Clock();
        let direction = 1;

        function animate() {
            requestAnimationFrame(animate);
            if (!isPaused) {
                const elapsedTime = clock.getElapsedTime();

                gltf.scene.rotation.y += 0.002;
            }
            controls.update();
            renderer.render(scene, camera);
        }

        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    function render() {
        renderer.render(scene, camera);
    }

    const pauseAnimation = () => {
        isPaused = true;
        clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => {
            isPaused = false;
        }, 2000);
    };
    controls.addEventListener('start', pauseAnimation);
    controls.addEventListener('end', () => {
        pauseAnimation();
    });
}

chickens.forEach(chicken => {
    render3D(`chickens/${chicken.path}/model.glb`, document.getElementById(`${chicken.path}_active`), chicken);
});