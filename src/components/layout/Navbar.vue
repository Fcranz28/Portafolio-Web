<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import ThemeToggle from '../ui/ThemeToggle.vue';
import { NAV_LINKS } from '../../data/constants';
import { openCommandPalette } from '../../stores/commandPalette';

const { y } = useWindowScroll();
const isScrolled = ref(false);
const menuOpen = ref(false);

watch(y, (newY) => {
  isScrolled.value = newY > 50;
});

let previousOverflow = '';
watch(menuOpen, (open) => {
  if (typeof document === 'undefined') return;
  if (open) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = previousOverflow;
  }
});

const closeMenu = () => { menuOpen.value = false; };
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu();
};
const desktopQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)') : null;
const handleBreakpoint = () => { if (desktopQuery?.matches) closeMenu(); };
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  desktopQuery?.addEventListener('change', handleBreakpoint);
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  desktopQuery?.removeEventListener('change', handleBreakpoint);
  if (menuOpen.value) document.body.style.overflow = previousOverflow;
});
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-4',
      isScrolled
        ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-2 border-black dark:border-primary shadow-md'
        : 'bg-transparent py-4 border-transparent'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 flex justify-between md:justify-center items-center relative">
      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="md:hidden text-gray-800 dark:text-white p-2 cursor-pointer"
        @click="menuOpen = !menuOpen"
        :aria-label="menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'"
        :aria-expanded="menuOpen" aria-controls="mobile-navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Desktop Menu -->
      <div class="flex items-center gap-6">
        <ul class="hidden md:flex gap-6 lg:gap-8 items-center">
          <li v-for="link in NAV_LINKS" :key="link.name">
            <a
              :href="link.href"
              class="text-lg lg:text-xl font-pixel text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary uppercase tracking-wider relative group"
            >
              {{ link.name }}
              <span class="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        </ul>

        <!-- Command Palette Trigger Button -->
        <button
          type="button"
          @click="openCommandPalette"
          class="hidden sm:flex items-center gap-2 px-3 py-1.5 border-2 border-dashed border-gray-400 dark:border-gray-600 hover:border-primary text-gray-600 dark:text-gray-300 font-pixel text-sm hover:text-primary transition-colors cursor-pointer"
          title="Buscar comandos o secciones (Cmd+K)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>⌘K</span>
        </button>

        <ThemeToggle />
      </div>
    </div>
  </nav>

      <!-- Mobile Menu Overlay -->
      <div id="mobile-navigation" :inert="!menuOpen" :aria-hidden="!menuOpen"
        :class="[
          'mobile-navigation fixed inset-0 bg-white dark:bg-black z-[100] flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden',
          menuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'
        ]"
      >
        <button
          type="button"
          class="absolute top-6 right-6 text-gray-800 dark:text-white p-2 cursor-pointer"
          @click="closeMenu"
          aria-label="Cerrar menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <ul class="flex flex-col gap-6 text-center">
          <li v-for="link in NAV_LINKS" :key="link.name">
            <a
              :href="link.href"
              @click="closeMenu"
              class="text-2xl font-pixel text-gray-800 dark:text-white hover:text-primary uppercase tracking-wider block"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-4 mt-4">
          <button
            type="button"
            @click="() => { closeMenu(); openCommandPalette(); }"
            class="pixel-btn px-4 py-2 bg-primary/10 text-primary font-pixel text-lg flex items-center gap-2"
          >
            <span>Buscar (⌘K)</span>
          </button>
          <ThemeToggle />
        </div>
      </div>

</template>

<style scoped>
.mobile-navigation {
  background: var(--bg-color);
  height: 100dvh;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: max(5rem, env(safe-area-inset-top)) 1.5rem max(2rem, env(safe-area-inset-bottom));
}
@media (max-height: 600px) {
  .mobile-navigation { justify-content: flex-start; gap: 1rem; }
  .mobile-navigation ul { gap: .75rem; }
}
</style>
