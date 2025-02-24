// Basic Three.js Black Hole Simulation
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Black Hole (a simple black sphere)
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const blackHole = new THREE.Mesh(geometry, material);
scene.add(blackHole);

// Accretion Disk (particles around the black hole)
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({ color: 0xff6600, size: 0.05 });
const particleCount = 500;
const positions = [];

for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 0.5;
    const z = Math.sin(angle) * radius;
    positions.push(x, y, z);
}

particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const accretionDisk = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(accretionDisk);

// Camera and Controls
camera.position.z = 10;
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    accretionDisk.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Responsive handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
