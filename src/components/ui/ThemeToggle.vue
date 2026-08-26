<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { $theme, toggleTheme } from '../../stores/theme';

const currentTheme = useStore($theme);
</script>

<template>
  <button
    type="button"
    @click="toggleTheme"
    class="p-2 border-2 border-current rounded-none hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-pixel text-xl cursor-pointer select-none"
    aria-label="Alternar tema claro y oscuro"
    :title="currentTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
  >
    <span>{{ currentTheme === 'light' ? '🌙' : '☀️' }}</span>
  </button>
</template>
