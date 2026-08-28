<script setup lang="ts">
import { ref } from 'vue';
import { EXPERIENCES } from '../../data/constants';

// Track expanded card IDs (default all open for rich presentation)
const expandedCards = ref<Record<string, boolean>>({
  tecnovedades: true,
  consigueventas: true,
  devdatep: true,
  promolider: true
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
  <section id="experience" class="py-20 px-4 relative overflow-hidden">
    <div class="max-w-5xl mx-auto space-y-12 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary font-pixel text-sm tracking-widest uppercase mb-1">
          <span class="w-2 h-2 bg-primary animate-pulse" />
          <span>CARRERA & TRAYECTORIA</span>
        </div>

        <h2 class="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white font-pixel tracking-wider">
          &lt; EXPERIENCIA_LABORAL /&gt;
        </h2>
        <div class="h-1 w-28 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        <p class="text-gray-600 dark:text-gray-300 font-pixel text-xl max-w-2xl mx-auto leading-relaxed">
          Ingeniería de software Full Stack, desarrollo móvil multiplataforma y arquitectura de sistemas de alto impacto.
        </p>

        <!-- Quick actions -->
        <div class="flex justify-center gap-4 pt-3 font-pixel">
          <button
            type="button"
            @click="expandAll"
            class="pixel-btn px-4 py-1.5 bg-white/80 dark:bg-black/60 hover:bg-primary/20 text-gray-800 dark:text-gray-200 border-2 border-primary/40 hover:border-primary text-base flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>[ + ] EXPANDIR TODO</span>
          </button>
          <button
            type="button"
            @click="collapseAll"
            class="pixel-btn px-4 py-1.5 bg-white/80 dark:bg-black/60 hover:bg-secondary/20 text-gray-800 dark:text-gray-200 border-2 border-gray-400 dark:border-gray-700 hover:border-secondary text-base flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>[ - ] COLAPSAR TODO</span>
          </button>
        </div>
      </div>

      <!-- Futuristic Cyber Timeline Track -->
      <div class="relative ml-2 sm:ml-6 md:ml-10 space-y-12 before:absolute before:left-[19px] sm:before:left-[23px] before:top-4 before:bottom-4 before:w-[3px] before:bg-gradient-to-b before:from-primary before:via-secondary before:to-accent before:shadow-[0_0_10px_var(--color-primary)]">
        
        <div
          v-for="(exp, index) in EXPERIENCES"
          :key="exp.id"
          class="relative pl-12 sm:pl-16 md:pl-20 group timeline-item"
        >
          <!-- Timeline Neon Index Node (01, 02...) with Pink Neon Glow -->
          <div
            class="timeline-node absolute left-0 top-6 w-10 sm:w-12 h-10 sm:h-12 bg-white dark:bg-[#0c0517] border-2 sm:border-3 border-secondary dark:border-secondary shadow-[0_0_15px_rgba(236,72,153,0.7)] group-hover:shadow-[0_0_25px_rgba(236,72,153,1)] transition-all duration-300 flex items-center justify-center font-pixel text-base sm:text-lg font-bold text-secondary dark:text-secondary group-hover:scale-110 z-20 select-none"
          >
            0{{ index + 1 }}
          </div>

          <!-- Horizontal Laser Connector Bridge (From Node into Card Edge) -->
          <div
            class="timeline-connector absolute left-[40px] sm:left-[48px] top-[43px] sm:top-[47px] w-[8px] sm:w-[16px] md:w-[32px] h-[3px] bg-secondary shadow-[0_0_10px_var(--color-secondary)] z-10 origin-left"
          />

          <!-- Experience Card -->
          <div
            class="pixel-card bg-white/95 dark:bg-[#130924]/90 backdrop-blur-md p-6 sm:p-8 border-2 border-black dark:border-primary/50 group-hover:border-secondary transition-all duration-300 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.15)] group-hover:dark:shadow-[0_0_30px_rgba(236,72,153,0.3)]"
          >
            <!-- Card Header / Collapsible Trigger -->
            <div
              @click="toggleCard(exp.id)"
              class="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none pb-5 border-b border-dashed border-gray-300 dark:border-gray-800"
            >
              <div class="space-y-2">
                <div class="flex flex-wrap items-center gap-3">
                  <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold font-pixel text-gray-900 dark:text-white tracking-wide group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {{ exp.company }}
                  </h3>
                  
                  <span
                    :class="[
                      'text-xs font-pixel px-2.5 py-1 border uppercase tracking-wider font-bold shadow-xs',
                      exp.badgeColor
                    ]"
                  >
                    [ {{ exp.modality }} ]
                  </span>
                </div>

                <div class="text-lg sm:text-xl font-pixel text-secondary dark:text-accent font-bold tracking-wider flex items-center gap-2">
                  <span class="text-sm font-normal text-gray-400">ROLE //</span>
                  {{ exp.role }}
                </div>
              </div>

              <!-- Duration Badge & Toggle Button -->
              <div class="flex items-center gap-3 self-start md:self-center">
                <div class="px-3.5 py-1.5 bg-primary/10 dark:bg-primary/20 border border-primary/40 text-gray-800 dark:text-primary font-pixel text-base sm:text-lg flex items-center gap-2">
                  <span class="text-primary font-bold">⏱</span>
                  <span>{{ exp.duration }}</span>
                </div>

                <button
                  type="button"
                  class="p-2 border border-gray-300 dark:border-primary/40 bg-gray-100 dark:bg-black/50 text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-colors font-bold text-sm cursor-pointer"
                  :aria-label="expandedCards[exp.id] ? 'Colapsar detalles' : 'Expandir detalles'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="square"
                    stroke-linejoin="miter"
                    :class="['transform transition-transform duration-300', expandedCards[exp.id] ? 'rotate-180' : 'rotate-0']"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Summary -->
            <p class="text-base sm:text-lg font-pixel text-gray-700 dark:text-gray-300 my-5 leading-relaxed pl-3 border-l-2 border-secondary/60">
              {{ exp.summary }}
            </p>

            <!-- Tech Badges / Skills -->
            <div class="flex flex-wrap gap-2 pt-1 pb-3">
              <span
                v-for="sk in exp.skills"
                :key="sk"
                class="px-3 py-1 text-xs sm:text-sm font-pixel bg-white dark:bg-black/40 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-primary/30 hover:border-secondary hover:text-secondary dark:hover:text-secondary transition-all cursor-default"
              >
                #{{ sk }}
              </span>
            </div>

            <!-- Expandable Projects / Responsibilities List -->
            <div
              v-show="expandedCards[exp.id]"
              class="mt-6 pt-6 border-t border-dashed border-gray-200 dark:border-gray-800 space-y-4 animate-fade-in"
            >
              <div class="flex items-center gap-2 text-secondary font-pixel text-lg font-bold tracking-wider">
                <span class="w-2 h-2 bg-secondary animate-pulse" />
                <span>[ FUNCIONES Y PROYECTOS CLAVE ]</span>
              </div>

              <!-- Projects Grid / Bento Cards -->
              <div class="grid sm:grid-cols-2 gap-4">
                <div
                  v-for="(proj, pIdx) in exp.projects"
                  :key="pIdx"
                  class="p-4 sm:p-5 bg-gray-50/80 dark:bg-[#0c0517]/80 border border-gray-200 dark:border-primary/20 hover:border-primary dark:hover:border-primary hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 space-y-2 group/subcard"
                >
                  <div class="font-bold text-base sm:text-lg font-pixel text-gray-900 dark:text-white flex items-start gap-2.5">
                    <span class="text-primary font-bold text-sm mt-0.5 group-hover/subcard:translate-x-1 transition-transform">▶</span>
                    <span class="group-hover/subcard:text-primary dark:group-hover/subcard:text-primary transition-colors leading-tight">
                      {{ proj.title }}
                    </span>
                  </div>

                  <p class="text-sm sm:text-base font-pixel text-gray-600 dark:text-gray-400 leading-relaxed pl-5">
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
