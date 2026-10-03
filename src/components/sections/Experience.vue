<script setup lang="ts">
import { ref } from 'vue';
import { EXPERIENCES } from '../../data/constants';
const expandedCards = ref<Record<string, boolean>>({});
const setAll = (expanded: boolean) => {
  EXPERIENCES.forEach(({ id }) => { expandedCards.value[id] = expanded; });
};
</script>

<template>
  <section id="experience" class="experience-section">
    <div class="experience-container">
      <header class="experience-heading">
        <div>
          <h2>Experiencia laboral<span aria-hidden="true">_</span></h2>
          <p>Desarrollo web, aplicaciones móviles y sistemas multiplataforma.</p>
        </div>
        <div class="experience-actions">
          <button type="button" @click="setAll(true)">Expandir todo</button>
          <button type="button" @click="setAll(false)">Cerrar todo</button>
        </div>
      </header>
      <ol class="career-timeline">
        <li v-for="exp in EXPERIENCES" :key="exp.id" class="career-entry">
          <div class="career-period">
            <span>{{ exp.period }}</span>
            <strong>{{ exp.duration }}</strong>
            <span v-if="exp.current" class="current-role">Actual</span>
          </div>
          <article class="career-content">
            <div class="career-meta">{{ exp.modality }}</div>
            <h3>{{ exp.role }}</h3>
            <p class="career-company">{{ exp.company }}</p>
            <p class="career-summary">{{ exp.summary }}</p>
            <ul class="career-skills" aria-label="Tecnologías">
              <li v-for="skill in exp.skills" :key="skill">{{ skill }}</li>
            </ul>
            <button type="button" class="career-toggle"
              :aria-expanded="!!expandedCards[exp.id]" :aria-controls="`details-${exp.id}`"
              @click="expandedCards[exp.id] = !expandedCards[exp.id]">
              {{ expandedCards[exp.id] ? 'Ocultar funciones' : 'Ver funciones y proyectos' }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ expanded: expandedCards[exp.id] }" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div :id="`details-${exp.id}`" v-show="expandedCards[exp.id]" class="career-details">
              <div v-for="project in exp.projects" :key="project.title">
                <h4>{{ project.title }}</h4><p>{{ project.description }}</p>
              </div>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
