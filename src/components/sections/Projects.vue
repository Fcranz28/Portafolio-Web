<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { PERSONAL_INFO } from '../../data/constants';
import PixelBackground from '../ui/PixelBackground.vue';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}

const repos = ref<Repository[]>([]);
const loading = ref(true);
const selectedLang = ref<string>('ALL');

const fetchRepos = async () => {
  try {
    const res = await fetch(`https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?per_page=100&sort=updated`);
    const data = await res.json();
    if (Array.isArray(data)) {
      repos.value = data
        .filter((r) => r.name !== 'CV' && !r.fork)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }
  } catch (err) {
    console.error('Error fetching repos:', err);
  } finally {
    loading.value = false;
  }
};

const languages = computed(() => {
  const set = new Set<string>();
  repos.value.forEach((r) => {
    if (r.language) set.add(r.language);
  });
  return ['ALL', ...Array.from(set)];
});

const filteredRepos = computed(() => {
  if (selectedLang.value === 'ALL') return repos.value;
  return repos.value.filter((r) => r.language === selectedLang.value);
});

onMounted(() => {
  fetchRepos();
});
</script>

<template>
  <section id="projects" class="py-16 px-4 relative overflow-hidden">
    <PixelBackground />

    <div class="max-w-6xl mx-auto space-y-8 relative z-10">
      <div class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white font-pixel">
          &lt; PROYECTOS_GITHUB /&gt;
        </h2>
        <div class="h-1 w-24 bg-primary mx-auto" />
        <p class="text-gray-600 dark:text-gray-300 font-pixel text-xl max-w-2xl mx-auto">
          Repositorios sincronizados directamente desde GitHub API.
        </p>
      </div>

      <!-- Language Filters -->
      <div v-if="!loading && languages.length > 1" class="flex flex-wrap justify-center gap-2 font-pixel">
        <button
          v-for="lang in languages"
          :key="lang"
          type="button"
          @click="selectedLang = lang"
          :class="[
            'px-3 py-1 text-sm md:text-base border-2 transition-all cursor-pointer',
            selectedLang === lang
              ? 'bg-primary text-white border-primary shadow-[2px_2px_0px_rgba(0,0,0,0.5)]'
              : 'bg-white/60 dark:bg-black/40 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-primary'
          ]"
        >
          {{ lang }}
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center font-pixel text-2xl animate-pulse text-gray-600 dark:text-gray-300 py-12">
        CARGANDO_REPOSITORIOS...
      </div>

      <!-- Repositories Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="repo in filteredRepos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="pixel-card p-6 bg-white/95 dark:bg-black/60 flex flex-col justify-between group no-underline transition-transform hover:-translate-y-1"
        >
          <div class="space-y-4">
            <div class="flex justify-between items-start border-b-2 border-dashed border-gray-200 dark:border-gray-800 pb-3">
              <h3 class="text-xl font-bold text-primary font-pixel truncate pr-2 group-hover:text-secondary transition-colors">
                {{ repo.name.toUpperCase() }}
              </h3>
              <span class="text-xs font-pixel text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5">
                public
              </span>
            </div>

            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 font-pixel leading-relaxed">
              {{ repo.description || 'Sin descripción disponible en el repositorio.' }}
            </p>
          </div>

          <div class="flex justify-between items-center text-sm font-pixel text-gray-500 dark:text-gray-400 pt-4 mt-4 border-t border-gray-100 dark:border-gray-900">
            <span class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 bg-secondary block"></span>
              {{ repo.language || 'Code' }}
            </span>
            <span>{{ new Date(repo.updated_at).toLocaleDateString() }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
