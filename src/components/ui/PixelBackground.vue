<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Pixel {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  color: string;
}

const pixels = ref<Pixel[]>([]);

onMounted(() => {
  const pixelCount = 24;
  const newPixels: Pixel[] = [];
  for (let i = 0; i < pixelCount; i++) {
    newPixels.push({
      id: i,
      left: Math.random() * 100,
      animationDuration: 6 + Math.random() * 10,
      animationDelay: Math.random() * 6,
      size: 10 + Math.random() * 18,
      color: Math.random() > 0.5 ? 'bg-primary' : 'bg-secondary'
    });
  }
  pixels.value = newPixels;
});
</script>

<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    <div
      v-for="pixel in pixels"
      :key="pixel.id"
      :class="['absolute', pixel.color, 'opacity-20 dark:opacity-30']"
      :style="{
        left: `${pixel.left}%`,
        bottom: '-50px',
        width: `${pixel.size}px`,
        height: `${pixel.size}px`,
        animation: `float-pixel ${pixel.animationDuration}s linear infinite`,
        animationDelay: `${pixel.animationDelay}s`
      }"
    />
  </div>
</template>

<style scoped>
@keyframes float-pixel {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>
