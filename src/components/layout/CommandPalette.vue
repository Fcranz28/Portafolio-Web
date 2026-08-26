<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useStore } from '@nanostores/vue';
import { $isCommandPaletteOpen, closeCommandPalette, toggleCommandPalette } from '../../stores/commandPalette';
import { toggleTheme } from '../../stores/theme';
import { PERSONAL_INFO } from '../../data/constants';

const isOpen = useStore($isCommandPaletteOpen);
const query = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const selectedIndex = ref(0);

interface PaletteItem {
  id: string;
  category: 'Secciones' | 'Acciones' | 'Contacto';
  title: string;
  subtitle?: string;
  icon: string;
  action: () => void;
}

const items: PaletteItem[] = [
  // Secciones
  {
    id: 'hero',
    category: 'Secciones',
    title: 'Ir a Inicio',
    subtitle: 'Hero principal y resumen',
    icon: '🏠',
    action: () => scrollToSection('#hero')
  },
  {
    id: 'experience',
    category: 'Secciones',
    title: 'Ir a Experiencia Profesional',
    subtitle: 'Tecnovedades, ConsigueVentas, Devdatep, Promolider',
    icon: '💼',
    action: () => scrollToSection('#experience')
  },
  {
    id: 'about',
    category: 'Secciones',
    title: 'Ir a Sobre Mí',
    subtitle: 'Bio, perfil y stack tecnológico',
    icon: '👨‍💻',
    action: () => scrollToSection('#about')
  },
  {
    id: 'projects',
    category: 'Secciones',
    title: 'Ir a Proyectos',
    subtitle: 'Repositorios GitHub en tiempo real',
    icon: '🚀',
    action: () => scrollToSection('#projects')
  },
  {
    id: 'certifications',
    category: 'Secciones',
    title: 'Ir a Certificaciones',
    subtitle: 'Certificados oficiales en PDF',
    icon: '📜',
    action: () => scrollToSection('#certifications')
  },
  {
    id: 'contact',
    category: 'Secciones',
    title: 'Ir a Contacto',
    subtitle: 'Email, LinkedIn, teléfono directo',
    icon: '✉️',
    action: () => scrollToSection('#contact')
  },

  // Acciones
  {
    id: 'theme',
    category: 'Acciones',
    title: 'Alternar Tema Claro / Oscuro',
    subtitle: 'Cambiar esquema de colores',
    icon: '🌓',
    action: () => {
      toggleTheme();
      closePalette();
    }
  },
  {
    id: 'github',
    category: 'Acciones',
    title: 'Abrir Perfil de GitHub',
    subtitle: PERSONAL_INFO.github,
    icon: '🐙',
    action: () => {
      window.open(PERSONAL_INFO.github, '_blank');
      closePalette();
    }
  },
  {
    id: 'linkedin',
    category: 'Acciones',
    title: 'Abrir LinkedIn',
    subtitle: PERSONAL_INFO.linkedin,
    icon: '🔗',
    action: () => {
      window.open(PERSONAL_INFO.linkedin, '_blank');
      closePalette();
    }
  },

  // Contacto
  {
    id: 'email',
    category: 'Contacto',
    title: 'Enviar Correo Electrónico',
    subtitle: PERSONAL_INFO.email,
    icon: '📧',
    action: () => {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
      closePalette();
    }
  }
];

const filteredItems = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) =>
    item.title.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(q))
  );
});

const scrollToSection = (hash: string) => {
  closePalette();
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const closePalette = () => {
  closeCommandPalette();
  query.value = '';
  selectedIndex.value = 0;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    toggleCommandPalette();
    if ($isCommandPaletteOpen.get()) {
      nextTick(() => searchInput.value?.focus());
    }
    return;
  }

  if (!$isCommandPaletteOpen.get()) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closePalette();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex.value = (selectedIndex.value + 1) % (filteredItems.value.length || 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex.value = (selectedIndex.value - 1 + filteredItems.value.length) % (filteredItems.value.length || 1);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const item = filteredItems.value[selectedIndex.value];
    if (item) {
      item.action();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    @click="closePalette"
  >
    <div
      class="bg-white dark:bg-black/90 border-4 border-black dark:border-primary w-full max-w-xl shadow-[8px_8px_0px_rgba(139,92,246,0.3)] overflow-hidden"
      @click.stop
    >
      <!-- Search Input Header -->
      <div class="flex items-center gap-3 p-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700">
        <span class="text-xl">🔍</span>
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Escribe un comando o sección... (ej: 'exp', 'tema', 'github')"
          class="w-full bg-transparent outline-none font-pixel text-xl text-gray-900 dark:text-white placeholder:text-gray-400"
          autofocus
        />
        <button
          type="button"
          @click="closePalette"
          class="text-xs font-pixel px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer"
        >
          ESC
        </button>
      </div>

      <!-- Results List -->
      <div class="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-gray-800 font-pixel">
        <div v-if="filteredItems.length === 0" class="p-6 text-center text-gray-500">
          No se encontraron resultados para "{{ query }}"
        </div>

        <button
          v-for="(item, idx) in filteredItems"
          :key="item.id"
          type="button"
          @click="item.action"
          @mouseenter="selectedIndex = idx"
          :class="[
            'w-full text-left p-3 flex items-center justify-between transition-colors cursor-pointer',
            selectedIndex === idx
              ? 'bg-primary/20 text-primary dark:text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200'
          ]"
        >
          <div class="flex items-center gap-3">
            <span class="text-xl">{{ item.icon }}</span>
            <div>
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div v-if="item.subtitle" class="text-xs text-gray-500 dark:text-gray-400">
                {{ item.subtitle }}
              </div>
            </div>
          </div>
          <span class="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
            {{ item.category }}
          </span>
        </button>
      </div>

      <!-- Footer Help -->
      <div class="p-2 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xs font-pixel text-gray-500">
        <span>Navegar: <kbd class="px-1 border">↑</kbd> <kbd class="px-1 border">↓</kbd></span>
        <span>Seleccionar: <kbd class="px-1 border">↵ Enter</kbd></span>
        <span>Cerrar: <kbd class="px-1 border">Esc</kbd></span>
      </div>
    </div>
  </div>
</template>
