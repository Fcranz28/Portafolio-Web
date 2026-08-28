<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const scrollPercent = ref(0);
const currentSection = ref('HERO');
const isVisible = ref(false);

const sections = [
  { id: 'hero', name: 'HERO' },
  { id: 'experience', name: 'EXPERIENCIA' },
  { id: 'about', name: 'SOBRE MÍ' },
  { id: 'projects', name: 'PROYECTOS' },
  { id: 'certifications', name: 'CERTIFICACIONES' },
  { id: 'contact', name: 'CONTACTO' }
];

const updateScroll = () => {
  if (typeof window === 'undefined') return;
  const currentY = window.scrollY || window.pageYOffset || 0;
  const maxScroll = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1
  );

  const percent = Math.min(Math.max((currentY / maxScroll) * 100, 0), 100);
  scrollPercent.value = Math.round(percent);
  isVisible.value = currentY > 120;

  // Determine current active section
  const scrollPosition = currentY + window.innerHeight * 0.35;
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id);
    if (el && el.offsetTop <= scrollPosition) {
      currentSection.value = sections[i].name;
      break;
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
  window.removeEventListener('resize', updateScroll);
});
</script>

<template>
  <div>
    <!-- Top HorizonX Laser Progress Bar -->
    <div
      class="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-black/10 dark:bg-white/5"
      aria-hidden="true"
    >
      <div
        class="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-150 shadow-[0_0_12px_var(--color-primary)]"
        :style="{ width: `${scrollPercent}%` }"
      />
    </div>

    <!-- Floating Cyber HUD (Bottom Right) -->
    <div
      :class="[
        'fixed bottom-6 right-6 z-40 transition-all duration-500 transform font-pixel select-none',
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      ]"
    >
      <div
        class="flex items-center gap-3 bg-white/90 dark:bg-black/90 backdrop-blur-md border-2 border-black dark:border-primary px-3.5 py-2 shadow-[4px_4px_0px_var(--border-color)] dark:shadow-[0_0_15px_rgba(139,92,246,0.25)]"
      >
        <!-- Section Indicator -->
        <div class="flex items-center gap-2 pr-2 border-r border-gray-300 dark:border-gray-700">
          <span class="w-2 h-2 rounded-none bg-secondary animate-pulse" />
          <span class="text-xs md:text-sm font-bold tracking-wider text-gray-800 dark:text-gray-200">
            [ {{ currentSection }} ]
          </span>
        </div>

        <!-- Scroll Percentage -->
        <div class="text-xs md:text-sm font-bold text-primary dark:text-accent font-mono min-w-[38px] text-right">
          {{ scrollPercent }}%
        </div>

        <!-- Back to Top Button -->
        <button
          type="button"
          @click="scrollToTop"
          class="ml-1 p-1 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:hover:text-black border border-primary/40 transition-all cursor-pointer group"
          title="Volver arriba"
          aria-label="Volver arriba"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="square"
            stroke-linejoin="miter"
            class="transform group-hover:-translate-y-0.5 transition-transform"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
