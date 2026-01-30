import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// 1. Cena, Câmera e Renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Luz (Essencial para ver os planetas que não têm luz própria)
const ambientLight = new THREE.AmbientLight(0x808080); // Luz suave em tudo
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 300); // O Sol emitirá esta luz
scene.add(pointLight);

// 3. Texturas (Você pode substituir por URLs de imagens reais de planetas)
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/sun.jpg');
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
const marsTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_color.jpg');
const jupiterTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/jupiter_1k_color.jpg');
const venusTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/venus_1k_color.jpg');

// 4. Criando o Sol
const sunGeo = new THREE.SphereGeometry(15, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture }); // BasicMaterial não precisa de luz para aparecer
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// 5. Criando a Terra
const earthGeo = new THREE.SphereGeometry(5, 32, 32);
const earthMat = new THREE.MeshStandardMaterial({ map: earthTexture }); // StandardMaterial REAGE à luz
const earth = new THREE.Mesh(earthGeo, earthMat);

// Criamos um "pivô" (um objeto invisível no centro) para facilitar a órbita
const earthOrbit = new THREE.Object3D();
scene.add(earthOrbit);
earthOrbit.add(earth);

earth.position.x = 50; // Distância do Sol

// 6. Criando Mercúrio
const mercuryGeo = new THREE.SphereGeometry(2, 32, 32);
const mercuryMat = new THREE.MeshStandardMaterial({ color: 0x8c7853 });
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryOrbit = new THREE.Object3D();
scene.add(mercuryOrbit);
mercuryOrbit.add(mercury);
mercury.position.x = 25;

// 7. Criando Vênus
const venusGeo = new THREE.SphereGeometry(4.8, 32, 32);
const venusMat = new THREE.MeshStandardMaterial({ color: 0xffc649 });
const venus = new THREE.Mesh(venusGeo, venusMat);
const venusOrbit = new THREE.Object3D();
scene.add(venusOrbit);
venusOrbit.add(venus);
venus.position.x = 35;

// 8. Criando Marte
const marsGeo = new THREE.SphereGeometry(2.5, 32, 32);
const marsMat = new THREE.MeshStandardMaterial({ color: 0xcd5c5c });
const mars = new THREE.Mesh(marsGeo, marsMat);
const marsOrbit = new THREE.Object3D();
scene.add(marsOrbit);
marsOrbit.add(mars);
mars.position.x = 65;

// 9. Criando Júpiter
const jupiterGeo = new THREE.SphereGeometry(12, 32, 32);
const jupiterMat = new THREE.MeshStandardMaterial({ color: 0xd8ca9d });
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
const jupiterOrbit = new THREE.Object3D();
scene.add(jupiterOrbit);
jupiterOrbit.add(jupiter);
jupiter.position.x = 100;

// 10. Controles de Mouse
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 50, 100);
controls.update();

// 7. Estrelas ao fundo (Partículas)
const starGeo = new THREE.BufferGeometry();
const starPositions = [];
for(let i=0; i<5000; i++) {
    const x = (Math.random() - 0.5) * 1000;
    const y = (Math.random() - 0.5) * 1000;
    const z = (Math.random() - 0.5) * 1000;
    starPositions.push(x, y, z);
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// 8. Loop de Animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação dos planetas sobre o próprio eixo
    sun.rotation.y += 0.004;
    earth.rotation.y += 0.01;
    mercury.rotation.y += 0.02;
    venus.rotation.y += 0.015;
    mars.rotation.y += 0.01;
    jupiter.rotation.y += 0.008;

    // Translação (Orbita ao redor do Sol)
    earthOrbit.rotation.y += 0.005;
    mercuryOrbit.rotation.y += 0.01;
    venusOrbit.rotation.y += 0.008;
    marsOrbit.rotation.y += 0.006;
    jupiterOrbit.rotation.y += 0.004;

    controls.update();
    renderer.render(scene, camera);
}

// Ajuste de tela caso o usuário redimensione o navegador
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();