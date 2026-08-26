<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { useStore } from '@nanostores/vue';
import { $theme } from '../../stores/theme';

const container = ref<HTMLDivElement | null>(null);
const currentTheme = useStore($theme);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let particleSystem: THREE.Points;
let animationFrameId: number;

let mouseX = 0;
let mouseY = 0;
let windowHalfX = 0;
let windowHalfY = 0;

const initThree = () => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight || 500;
  windowHalfX = width / 2;
  windowHalfY = height / 2;

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
  camera.position.z = 1000;

  // Particles
  const particleCount = 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const isDark = currentTheme.value === 'dark';
  const color1 = new THREE.Color(isDark ? 0x8b5cf6 : 0x6d28d9); // Violet
  const color2 = new THREE.Color(isDark ? 0xec4899 : 0xdb2777); // Pink
  const color3 = new THREE.Color(isDark ? 0x3b82f6 : 0x2563eb); // Blue

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 2000;
    positions[i3 + 1] = (Math.random() - 0.5) * 2000;
    positions[i3 + 2] = (Math.random() - 0.5) * 2000;

    const chosenColor = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3;
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 5,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Floating wireframe icosahedron
  const icoGeometry = new THREE.IcosahedronGeometry(250, 1);
  const icoMaterial = new THREE.MeshBasicMaterial({
    color: isDark ? 0x8b5cf6 : 0x4f46e5,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
  icosahedron.name = 'icosahedron';
  scene.add(icosahedron);

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  // Events
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);

  // Start loop
  animate();
};

const onMouseMove = (event: MouseEvent) => {
  mouseX = (event.clientX - windowHalfX) * 0.5;
  mouseY = (event.clientY - windowHalfY) * 0.5;
};

const onWindowResize = () => {
  if (!container.value || !renderer || !camera) return;
  const width = container.value.clientWidth;
  const height = container.value.clientHeight || 500;
  windowHalfX = width / 2;
  windowHalfY = height / 2;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  if (particleSystem) {
    particleSystem.rotation.x += 0.0005;
    particleSystem.rotation.y += 0.001;
  }

  const icosahedron = scene.getObjectByName('icosahedron');
  if (icosahedron) {
    icosahedron.rotation.x -= 0.002;
    icosahedron.rotation.y -= 0.003;
  }

  camera.position.x += (mouseX - camera.position.x) * 0.03;
  camera.position.y += (-mouseY - camera.position.y) * 0.03;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
};

onMounted(() => {
  initThree();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove);
  if (renderer && renderer.domElement) {
    renderer.dispose();
    renderer.domElement.remove();
  }
});
</script>

<template>
  <div ref="container" class="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full" />
</template>
