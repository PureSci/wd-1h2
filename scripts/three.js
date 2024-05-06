import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

initThree();

function initThree() {
    let isPaused = false;
    let pauseTimeout;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1000 / 700, 0.1, 1000);
    camera.position.set(6, 3, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(1000, 700);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 0, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new GLTFLoader();
    loader.load('Toolbox.glb', function (gltf) {
        gltf.scene.rotation.y = THREE.MathUtils.degToRad(-90);
        gltf.scene.position.y = -3.5;
        scene.add(gltf.scene);
        render();
        let clock = new THREE.Clock();
        let direction = 1;

        function animate() {
            requestAnimationFrame(animate);
            if (!isPaused) {
                const elapsedTime = clock.getElapsedTime();

                gltf.scene.rotation.y += 0.005;

                const positionDelta = Math.sin(elapsedTime) * 0.01;
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