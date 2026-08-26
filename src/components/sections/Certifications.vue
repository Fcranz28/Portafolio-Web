<script setup lang="ts">
import { ref } from 'vue';
import { CERTIFICATIONS } from '../../data/constants';
import PixelBackground from '../ui/PixelBackground.vue';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  file: string;
}

const selectedCert = ref<Certificate | null>(null);

const openCert = (cert: Certificate) => {
  selectedCert.value = cert;
};

const closeCert = () => {
  selectedCert.value = null;
};
</script>

<template>
  <section id="certifications" class="py-16 px-4 relative overflow-hidden">
    <PixelBackground />

    <div class="max-w-4xl mx-auto space-y-10 relative z-10">
      <div class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white font-pixel">
          &lt; CERTIFICACIONES /&gt;
        </h2>
        <div class="h-1 w-24 bg-primary mx-auto" />
        <p class="text-gray-600 dark:text-gray-300 font-pixel text-xl max-w-2xl mx-auto">
          Títulos y certificaciones de especialización profesional.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="cert in CERTIFICATIONS"
          :key="cert.title"
          class="pixel-card p-6 md:p-8 bg-white/95 dark:bg-black/60 flex flex-col items-center text-center gap-4 group"
        >
          <div class="p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-2 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
              <path d="M12 15l-2 5l2 2l2 -2l-2 -5" />
              <circle cx="12" cy="9" r="7" />
              <path d="M12 9h-2" />
              <path d="M12 9v3" />
              <path d="M12 9h.01" />
            </svg>
          </div>

          <h3 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white font-pixel">
            {{ cert.title }}
          </h3>

          <div class="text-base md:text-lg font-pixel text-gray-600 dark:text-gray-400">
            <p>{{ cert.issuer }}</p>
            <p>{{ cert.date }}</p>
          </div>

          <div class="flex gap-3 pt-2">
            <button
              type="button"
              @click="openCert(cert)"
              class="pixel-btn px-4 py-2 bg-secondary text-white font-pixel text-base hover:bg-secondary/90 cursor-pointer"
            >
              VER MODAL ↗
            </button>
            <a
              :href="cert.file"
              target="_blank"
              download
              class="pixel-btn px-4 py-2 bg-white dark:bg-black text-black dark:text-white font-pixel text-base hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer no-underline inline-block"
            >
              ABRIR PDF 📄
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Visor PDF -->
    <div
      v-if="selectedCert"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      @click="closeCert"
    >
      <div
        class="bg-white dark:bg-gray-900 w-full max-w-4xl h-[85vh] pixel-card p-3 relative flex flex-col"
        @click.stop
      >
        <div class="flex justify-between items-center p-2 mb-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40">
          <h3 class="text-lg font-pixel font-bold text-gray-800 dark:text-white px-2">
            {{ selectedCert.title }} - {{ selectedCert.issuer }}
          </h3>
          <div class="flex items-center gap-2">
            <a
              :href="selectedCert.file"
              target="_blank"
              class="text-xs px-2 py-1 bg-primary text-white font-pixel no-underline"
            >
              PANTALLA COMPLETA ↗
            </a>
            <button
              type="button"
              @click="closeCert"
              class="p-1 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-black text-gray-800 dark:text-white cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-hidden relative bg-gray-100 dark:bg-gray-800">
          <iframe
            :src="`${selectedCert.file}#toolbar=1`"
            class="w-full h-full border-none"
            title="Certificado PDF"
          />
        </div>
      </div>
    </div>
  </section>
</template>
