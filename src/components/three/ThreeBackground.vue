<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';
import { useStore } from '@nanostores/vue';
import { $theme } from '../../stores/theme';

const container = ref<HTMLDivElement | null>(null);
const currentTheme = useStore($theme);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let particleSystem: THREE.Points;
let particleGeometry: THREE.BufferGeometry;
let particleMaterial: THREE.PointsMaterial;
let animationFrameId: number;

// Floating geometries group
let floatingGroup: THREE.Group;
const meshes: {
  mesh: THREE.Mesh;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  floatSpeed: number;
  floatOffset: number;
  initialY: number;
}[] = [];

// Interaction tracking
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;
let scrollY = 0;
let targetScrollY = 0;
let lastScrollY = 0;
let scrollVelocity = 0;
let smoothedVelocity = 0;
let windowWidth = 0;
let windowHeight = 0;
let maxScroll = 1;

const PARTICLE_COUNT = 2200;
const SCENE_DEPTH_SPAN = 3800; // Total 3D vertical travel distance
const BASE_FOV = 65;

const getThemeColors = (isDark: boolean) => {
  if (isDark) {
    return {
      c1: new THREE.Color(0x8b5cf6), // Violet
      c2: new THREE.Color(0xec4899), // Pink
      c3: new THREE.Color(0x38bdf8), // Cyan/Sky
      meshColor: new THREE.Color(0x8b5cf6),
      meshOpacity: 0.18,
      particleOpacity: 0.8,
      blending: THREE.AdditiveBlending
    };
  } else {
    return {
      c1: new THREE.Color(0x7c3aed), // Deep Violet
      c2: new THREE.Color(0xdb2777), // Deep Pink
      c3: new THREE.Color(0x2563eb), // Deep Blue
      meshColor: new THREE.Color(0x6d28d9),
      meshOpacity: 0.14,
      particleOpacity: 0.7,
      blending: THREE.NormalBlending
    };
  }
};

const updateThemeStyles = () => {
  if (!particleGeometry || !particleMaterial || !floatingGroup) return;
  const isDark = currentTheme.value === 'dark';
  const colors = getThemeColors(isDark);

  // Update particles colors
  const colorAttr = particleGeometry.getAttribute('color') as THREE.BufferAttribute;
  if (colorAttr) {
    const colorArray = colorAttr.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const chosenColor = Math.random() > 0.6 ? colors.c1 : Math.random() > 0.3 ? colors.c2 : colors.c3;
      colorArray[i3] = chosenColor.r;
      colorArray[i3 + 1] = chosenColor.g;
      colorArray[i3 + 2] = chosenColor.b;
    }
    colorAttr.needsUpdate = true;
  }

  particleMaterial.opacity = colors.particleOpacity;
  particleMaterial.blending = colors.blending;
  particleMaterial.needsUpdate = true;

  // Update floating meshes materials
  floatingGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
      child.material.color = colors.meshColor;
      child.material.opacity = colors.meshOpacity;
      child.material.needsUpdate = true;
    }
  });
};

const updateDimensions = () => {
  if (typeof window === 'undefined') return;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  const docHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    windowHeight
  );
  maxScroll = Math.max(docHeight - windowHeight, 1);
};

const initThree = () => {
  if (!container.value) return;

  updateDimensions();

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(BASE_FOV, windowWidth / windowHeight, 1, 5000);
  camera.position.z = 1000;

  const isDark = currentTheme.value === 'dark';
  const colors = getThemeColors(isDark);

  // Particle System with broad vertical span
  particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const particleColors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 2600;
    positions[i3 + 1] = Math.random() * (SCENE_DEPTH_SPAN + 2400) - (SCENE_DEPTH_SPAN + 1200);
    positions[i3 + 2] = (Math.random() - 0.5) * 2200;

    const chosenColor = Math.random() > 0.6 ? colors.c1 : Math.random() > 0.3 ? colors.c2 : colors.c3;
    particleColors[i3] = chosenColor.r;
    particleColors[i3 + 1] = chosenColor.g;
    particleColors[i3 + 2] = chosenColor.b;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  particleMaterial = new THREE.PointsMaterial({
    size: 4.5,
    vertexColors: true,
    transparent: true,
    opacity: colors.particleOpacity,
    blending: colors.blending
  });

  particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Floating wireframe geometries
  floatingGroup = new THREE.Group();
  scene.add(floatingGroup);

  const createWireframeMesh = (
    geometry: THREE.BufferGeometry,
    pos: [number, number, number],
    rotSpeeds: [number, number, number],
    floatSpeed: number
  ) => {
    const material = new THREE.MeshBasicMaterial({
      color: colors.meshColor,
      wireframe: true,
      transparent: true,
      opacity: colors.meshOpacity
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...pos);
    floatingGroup.add(mesh);

    meshes.push({
      mesh,
      rotSpeedX: rotSpeeds[0],
      rotSpeedY: rotSpeeds[1],
      rotSpeedZ: rotSpeeds[2],
      floatSpeed,
      floatOffset: Math.random() * Math.PI * 2,
      initialY: pos[1]
    });
  };

  // 1. HERO SECTION (Y ~ 0)
  createWireframeMesh(new THREE.IcosahedronGeometry(220, 1), [0, 150, 0], [0.0015, 0.002, 0.001], 0.0012);
  createWireframeMesh(new THREE.TorusGeometry(140, 22, 12, 36), [520, -250, -250], [-0.002, 0.0025, 0.001], 0.0015);

  // 2. EXPERIENCIA LABORAL (Y ~ -750 to -1200)
  createWireframeMesh(new THREE.OctahedronGeometry(150, 0), [-480, -750, -150], [0.002, -0.0018, 0.002], 0.0018);
  createWireframeMesh(new THREE.BoxGeometry(160, 160, 160), [500, -1150, -200], [0.0015, 0.002, -0.0015], 0.0014);

  // 3. SOBRE MI (Y ~ -1500 to -1850)
  createWireframeMesh(new THREE.DodecahedronGeometry(160, 0), [-450, -1550, -180], [-0.0018, 0.0022, 0.001], 0.0016);
  createWireframeMesh(new THREE.TorusGeometry(130, 20, 12, 32), [460, -1850, -220], [0.0022, -0.0015, 0.002], 0.0015);

  // 4. PROYECTOS GITHUB (Y ~ -2200 to -2650)
  createWireframeMesh(new THREE.TorusKnotGeometry(110, 28, 64, 8), [0, -2250, -200], [0.002, 0.003, 0.0015], 0.002);
  createWireframeMesh(new THREE.IcosahedronGeometry(150, 0), [-500, -2600, -150], [-0.0015, 0.0025, -0.001], 0.0017);
  createWireframeMesh(new THREE.OctahedronGeometry(130, 0), [520, -2700, -180], [0.002, -0.002, 0.002], 0.0015);

  // 5. CERTIFICACIONES (Y ~ -3000 to -3300)
  createWireframeMesh(new THREE.DodecahedronGeometry(150, 0), [-420, -3100, -160], [0.0018, 0.002, -0.0015], 0.0016);
  createWireframeMesh(new THREE.TorusGeometry(140, 22, 12, 36), [480, -3300, -200], [-0.002, 0.0025, 0.001], 0.0018);

  // 6. CONTACTO (Y ~ -3600 to -3850)
  createWireframeMesh(new THREE.IcosahedronGeometry(200, 1), [0, -3650, 0], [0.002, 0.0025, 0.0015], 0.0015);
  createWireframeMesh(new THREE.TetrahedronGeometry(130, 0), [-460, -3800, -120], [0.0025, 0.0015, 0.002], 0.0016);
  createWireframeMesh(new THREE.OctahedronGeometry(130, 0), [460, -3850, -140], [-0.002, 0.002, 0.0025], 0.0016);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(windowWidth, windowHeight);
  container.value.appendChild(renderer.domElement);

  // Listeners
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  const heightCheckInterval = setInterval(updateDimensions, 1000);
  (container.value as any).__heightCheckInterval = heightCheckInterval;

  targetScrollY = window.scrollY || 0;
  scrollY = targetScrollY;
  lastScrollY = targetScrollY;

  animate();
};

const onMouseMove = (event: MouseEvent) => {
  targetMouseX = (event.clientX - windowWidth / 2) * 0.4;
  targetMouseY = (event.clientY - windowHeight / 2) * 0.4;
};

const onScroll = () => {
  targetScrollY = window.scrollY || window.pageYOffset || 0;
};

const onWindowResize = () => {
  if (!renderer || !camera) return;
  updateDimensions();

  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(windowWidth, windowHeight);
};

let clock = new THREE.Clock();

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Calculate instant & smoothed scroll velocity (HorizonX Physics)
  scrollVelocity = targetScrollY - lastScrollY;
  lastScrollY = targetScrollY;
  smoothedVelocity += (scrollVelocity - smoothedVelocity) * 0.08;

  // Smooth lerp for mouse and scroll
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;
  scrollY += (targetScrollY - scrollY) * 0.06;

  // Dynamic HorizonX FOV breathing on scroll velocity
  const velocityFovBoost = Math.min(Math.abs(smoothedVelocity) * 0.04, 8);
  const targetFov = BASE_FOV + velocityFovBoost;
  if (Math.abs(camera.fov - targetFov) > 0.01) {
    camera.fov += (targetFov - camera.fov) * 0.1;
    camera.updateProjectionMatrix();
  }

  // Normalized scroll progress
  const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  const targetCamY = -scrollProgress * SCENE_DEPTH_SPAN;

  // Camera scroll travel & mouse tilt with velocity tilt
  const velocityTilt = Math.max(Math.min(smoothedVelocity * 0.001, 0.2), -0.2);
  camera.position.x = mouseX * 0.6;
  camera.position.y = targetCamY - mouseY * 0.4;
  camera.position.z = 1000 + Math.sin(scrollProgress * Math.PI) * 140 - Math.abs(smoothedVelocity) * 0.3;
  camera.rotation.z = velocityTilt * 0.05;

  camera.lookAt(0, targetCamY, 0);

  // Rotate particle universe slowly and respond to scroll velocity
  if (particleSystem) {
    const angularVelocity = smoothedVelocity * 0.00015;
    particleSystem.rotation.y = elapsedTime * 0.015 + scrollProgress * 0.8 + angularVelocity;
    particleSystem.rotation.x = Math.sin(elapsedTime * 0.03) * 0.04 + (mouseY * 0.0001);

    // Infinite particle wrapping around camera Y position
    const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
    if (posAttr) {
      const posArray = posAttr.array as Float32Array;
      const camY = camera.position.y;
      const halfBound = 2200;
      let needsUpdate = false;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3 + 1; // Y coordinate
        const diff = posArray[i3] - camY;
        if (diff > halfBound) {
          posArray[i3] -= halfBound * 2;
          needsUpdate = true;
        } else if (diff < -halfBound) {
          posArray[i3] += halfBound * 2;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        posAttr.needsUpdate = true;
      }
    }
  }

  // Update floating meshes with extra angular spin on velocity
  const extraSpin = smoothedVelocity * 0.0001;
  meshes.forEach((item) => {
    item.mesh.rotation.x += item.rotSpeedX + extraSpin;
    item.mesh.rotation.y += item.rotSpeedY + extraSpin * 1.5;
    item.mesh.rotation.z += item.rotSpeedZ;
    item.mesh.position.y = item.initialY + Math.sin(elapsedTime * item.floatSpeed * 1000 + item.floatOffset) * 22;
  });

  renderer.render(scene, camera);
};

// React to theme changes
watch(currentTheme, () => {
  updateThemeStyles();
});

onMounted(() => {
  initThree();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('scroll', onScroll);

  if (container.value && (container.value as any).__heightCheckInterval) {
    clearInterval((container.value as any).__heightCheckInterval);
  }

  if (particleGeometry) particleGeometry.dispose();
  if (particleMaterial) particleMaterial.dispose();

  meshes.forEach((item) => {
    if (item.mesh.geometry) item.mesh.geometry.dispose();
    if (item.mesh.material instanceof THREE.Material) item.mesh.material.dispose();
  });

  if (renderer && renderer.domElement) {
    renderer.dispose();
    renderer.domElement.remove();
  }
});
</script>

<template>
  <div
    ref="container"
    class="portfolio-scene fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden"
    aria-hidden="true"
  />
</template>
