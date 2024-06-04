import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Renders a 3D model in the given container.
 * @param {string} model 
 * @param {HTMLElement} container 
 */
function render3D(model, container) {
    let isPaused = false;
    let pauseTimeout;

    const scene = new THREE.Scene();
    //scene.background = new THREE.Color(0x1d81d8);
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(15, 3, 10);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x1d81d8, 1);
    renderer.setSize(container.clientWidth, container.clientWidth);
    renderer.domElement.setAttribute("x-show", "image == 0");
    renderer.domElement.classList.add("rounded-xl");

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

    const directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight5.position.set(5, 0, 0);
    scene.add(directionalLight5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new GLTFLoader();
    loader.load(model, function (gltf) {
        gltf.scene.rotation.y = THREE.MathUtils.degToRad(-90);
        gltf.scene.position.y = -5.5;
        scene.add(gltf.scene);
        render();
        let clock = new THREE.Clock();
        let direction = 1;

        function animate() {
            requestAnimationFrame(animate);
            if (!isPaused) {
                const elapsedTime = clock.getElapsedTime();

                gltf.scene.rotation.y += 0.002;

                const positionDelta = Math.sin(elapsedTime) * 0.005;
                gltf.scene.position.y += positionDelta * direction;
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

render3D('chickens/ducktor_who/model.glb', document.getElementById('ducktor_who_active'));