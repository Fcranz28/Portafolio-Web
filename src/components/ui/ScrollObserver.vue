<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

let observer: IntersectionObserver | null = null;

const initScrollObserver = () => {
  if (typeof window === 'undefined') return;

  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((el, index) => {
    (el as HTMLElement).style.setProperty('--reveal-delay', `${index * 0.12}s`);
  });

  // Other standalone elements
  const generalElements = document.querySelectorAll(
    'section:not(#experience), #hero h1, #hero h2, #hero p, .grid > a, .grid > div:not(.timeline-item *)'
  );

  generalElements.forEach((el, index) => {
    if (!el.classList.contains('scroll-reveal-item')) {
      el.classList.add('scroll-reveal-item');
      (el as HTMLElement).style.setProperty('--reveal-delay', `${(index % 4) * 0.08}s`);
    }
  });

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  timelineItems.forEach((el) => observer?.observe(el));
  generalElements.forEach((el) => observer?.observe(el));

  // Card Interactive Spotlight Effect (HorizonX)
  const cards = document.querySelectorAll<HTMLElement>('.pixel-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
  });
};

onMounted(() => {
  initScrollObserver();
  document.addEventListener('astro:page-load', initScrollObserver);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  document.removeEventListener('astro:page-load', initScrollObserver);
});
</script>

<template>
  <div class="hidden" aria-hidden="true" />
</template>
