<script setup lang="ts">
import { ref } from 'vue';
import { EXPERIENCES } from '../../data/constants';
import PixelBackground from '../ui/PixelBackground.vue';

// Track expanded card IDs
const expandedCards = ref<Record<string, boolean>>({
  tecnovedades: true,
  consigueventas: true,
  devdatep: false,
  promolider: false
});

const toggleCard = (id: string) => {
  expandedCards.value[id] = !expandedCards.value[id];
};

const expandAll = () => {
  EXPERIENCES.forEach(e => {
    expandedCards.value[e.id] = true;
  });
};

const collapseAll = () => {
  EXPERIENCES.forEach(e => {
    expandedCards.value[e.id] = false;
  });
};
</script>

<template>
  <section id="experience" class="py-16 px-4 relative overflow-hidden">
    <PixelBackground />

    <div class="max-w-5xl mx-auto space-y-10 relative z-10">
      <!-- Section Header -->
      <div class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white font-pixel">
          &lt; EXPERIENCIA_LABORAL /&gt;
        </h2>
        <div class="h-1 w-24 bg-primary mx-auto" />
        <p class="text-gray-600 dark:text-gray-300 font-pixel text-xl max-w-2xl mx-auto">
          Trayectoria profesional en desarrollo de software Full Stack, Mobile y optimización web.
        </p>

        <!-- Quick actions -->
        <div class="flex justify-center gap-3 pt-2 text-sm font-pixel">
          <button
            type="button"
            @click="expandAll"
            class="px-3 py-1 bg-white/50 dark:bg-white/10 border border-primary/30 hover:border-primary text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            [+] Expandir Todo
          </button>
          <button
            type="button"
            @click="collapseAll"
            class="px-3 py-1 bg-white/50 dark:bg-white/10 border border-primary/30 hover:border-primary text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            [-] Colapsar Todo
          </button>
        </div>
      </div>

      <!-- Timeline Container -->
      <div class="relative border-l-4 border-primary/40 dark:border-primary/60 ml-4 md:ml-8 pl-6 md:pl-10 space-y-8">
        <div
          v-for="(exp, index) in EXPERIENCES"
          :key="exp.id"
          class="relative group"
        >
          <!-- Timeline Pin Dot -->
          <div
            class="absolute -left-[35px] md:-left-[51px] top-6 w-6 h-6 bg-white dark:bg-black border-4 border-primary group-hover:bg-secondary transition-colors"
          />

          <!-- Experience Card -->
          <div
            class="pixel-card p-6 md:p-8 bg-white/95 dark:bg-black/80 backdrop-blur-sm transition-all duration-300"
          >
            <!-- Header Clickable to Toggle -->
            <div
              @click="toggleCard(exp.id)"
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none border-b-2 border-dashed border-gray-200 dark:border-gray-800 pb-4"
            >
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-2xl md:text-3xl font-bold font-pixel text-primary dark:text-primary">
                    {{ exp.company }}
                  </h3>
                  <span
                    :class="['text-xs font-pixel px-2 py-0.5 border rounded-none uppercase', exp.badgeColor]"
                  >
                    {{ exp.modality }}
                  </span>
                </div>
                <div class="text-lg md:text-xl font-pixel text-gray-700 dark:text-gray-200 font-bold">
                  {{ exp.role }}
                </div>
              </div>

              <div class="flex items-center gap-4">
                <span class="text-base md:text-lg font-pixel text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-3 py-1 border border-gray-300 dark:border-gray-700">
                  ⏱ {{ exp.duration }}
                </span>
                <span class="text-2xl text-primary font-bold">
                  {{ expandedCards[exp.id] ? '▲' : '▼' }}
                </span>
              </div>
            </div>

            <!-- Summary -->
            <p class="text-base md:text-lg font-pixel text-gray-700 dark:text-gray-300 my-4 leading-relaxed">
              {{ exp.summary }}
            </p>

            <!-- Skills Badges -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="sk in exp.skills"
                :key="sk"
                class="px-2.5 py-1 text-xs md:text-sm font-pixel bg-primary/10 dark:bg-primary/20 text-primary border border-primary/30"
              >
                #{{ sk }}
              </span>
            </div>

            <!-- Expandable Projects / Responsibilities List -->
            <div v-show="expandedCards[exp.id]" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4 animate-fade-in">
              <h4 class="text-lg font-pixel font-bold text-secondary uppercase tracking-wider">
                [ Funciones y Proyectos Clave ]
              </h4>

              <div class="grid gap-3">
                <div
                  v-for="(proj, pIdx) in exp.projects"
                  :key="pIdx"
                  class="p-4 bg-gray-50 dark:bg-gray-900/60 border-l-4 border-secondary space-y-1.5"
                >
                  <div class="font-bold text-base md:text-lg font-pixel text-gray-900 dark:text-white flex items-center gap-2">
                    <span class="text-secondary font-bold">▶</span> {{ proj.title }}
                  </div>
                  <p class="text-sm md:text-base font-pixel text-gray-600 dark:text-gray-300 leading-relaxed pl-5">
                    {{ proj.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
