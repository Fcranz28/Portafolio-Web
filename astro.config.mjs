import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { templateCompilerOptions } from '@tresjs/core';

export default defineConfig({
  integrations: [
    vue({
      ...templateCompilerOptions
    })
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});
