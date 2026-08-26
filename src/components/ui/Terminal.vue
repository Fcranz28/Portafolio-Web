<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../../data/constants';
import { toggleTheme } from '../../stores/theme';

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

const inputCommand = ref('');
const logs = ref<LogEntry[]>([
  { type: 'output', text: 'Bienvenido al terminal interactivo de Franz Aguilar v2.0' },
  { type: 'output', text: 'Escribe "help" para ver la lista de comandos disponibles.' }
]);

const terminalBody = ref<HTMLElement | null>(null);
const terminalInput = ref<HTMLInputElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
    }
  });
};

const executeCommand = (cmdText?: string) => {
  const raw = (cmdText ?? inputCommand.value).trim();
  if (!raw) return;

  logs.value.push({ type: 'input', text: `$ ${raw}` });
  const [cmd, ...args] = raw.toLowerCase().split(' ');

  switch (cmd) {
    case 'help':
      logs.value.push({
        type: 'output',
        text: `Comandos disponibles:
  • about       : Información sobre mi perfil profesional
  • exp         : Resumen de mis 4 experiencias laborales
  • skills      : Lista de habilidades y tecnologías clave
  • projects    : Enlace a mis repositorios de GitHub
  • contact     : Canales de contacto directo
  • theme       : Alternar entre modo claro y oscuro
  • clear / cls : Limpiar la pantalla del terminal
  • matrix      : Efecto visual especial 🟢`
      });
      break;

    case 'about':
      logs.value.push({
        type: 'output',
        text: `${PERSONAL_INFO.name}\n${PERSONAL_INFO.role}\n${PERSONAL_INFO.bio}`
      });
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'exp':
      logs.value.push({
        type: 'output',
        text: `Experiencia Profesional:\n` +
          EXPERIENCES.map((e, i) => `${i + 1}. [${e.duration}] ${e.company} - ${e.role}`).join('\n')
      });
      document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'skills':
      logs.value.push({
        type: 'output',
        text: `Tech Stack: ${SKILLS.join(', ')}`
      });
      break;

    case 'projects':
      logs.value.push({
        type: 'success',
        text: `Abriendo sección de proyectos en GitHub... (${PERSONAL_INFO.github})`
      });
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'contact':
      logs.value.push({
        type: 'output',
        text: `Email: ${PERSONAL_INFO.email}\nTel: ${PERSONAL_INFO.phone}\nLinkedIn: ${PERSONAL_INFO.linkedin}`
      });
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      break;

    case 'theme':
      toggleTheme();
      logs.value.push({
        type: 'success',
        text: `Tema cambiado exitosamente.`
      });
      break;

    case 'clear':
    case 'cls':
      logs.value = [];
      break;

    case 'matrix':
      logs.value.push({
        type: 'success',
        text: `01000110 01010010 01000001 01001110 01011010 🟢 Sigue al conejo blanco...`
      });
      break;

    default:
      logs.value.push({
        type: 'error',
        text: `Comando no reconocido: "${raw}". Escribe "help" para ver los comandos.`
      });
  }

  inputCommand.value = '';
  scrollToBottom();
};

const handleQuickCommand = (cmd: string) => {
  executeCommand(cmd);
};

const focusInput = () => {
  terminalInput.value?.focus();
};
</script>

<template>
  <div
    class="pixel-card w-full max-w-3xl mx-auto bg-black/90 text-green-400 font-pixel text-base sm:text-lg border-4 border-black dark:border-primary shadow-2xl overflow-hidden"
    @click="focusInput"
  >
    <!-- Terminal Header Bar -->
    <div class="bg-gray-900 px-4 py-2 flex items-center justify-between border-b-2 border-gray-800 select-none">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-red-500 inline-block"></span>
        <span class="w-3 h-3 bg-yellow-500 inline-block"></span>
        <span class="w-3 h-3 bg-green-500 inline-block"></span>
      </div>
      <div class="text-xs text-gray-400 tracking-wider">franz@portfolio:~ (bash)</div>
      <div class="text-xs text-gray-500">v2.0</div>
    </div>

    <!-- Quick Command Buttons for Mobile / Convenience -->
    <div class="bg-gray-950/80 px-3 py-1.5 border-b border-gray-800/80 flex flex-wrap gap-2 text-xs">
      <span class="text-gray-500 py-0.5">Quick:</span>
      <button
        v-for="btn in ['help', 'exp', 'skills', 'about', 'theme']"
        :key="btn"
        type="button"
        @click.stop="handleQuickCommand(btn)"
        class="px-2 py-0.5 bg-gray-800 text-gray-300 hover:bg-primary hover:text-white transition-colors cursor-pointer"
      >
        {{ btn }}
      </button>
    </div>

    <!-- Terminal Content Area -->
    <div ref="terminalBody" class="p-4 h-64 sm:h-72 overflow-y-auto space-y-2 font-pixel">
      <div v-for="(log, idx) in logs" :key="idx" class="leading-relaxed">
        <span v-if="log.type === 'input'" class="text-white font-bold">{{ log.text }}</span>
        <pre v-else-if="log.type === 'output'" class="text-gray-300 whitespace-pre-wrap font-pixel">{{ log.text }}</pre>
        <span v-else-if="log.type === 'success'" class="text-emerald-400">{{ log.text }}</span>
        <span v-else-if="log.type === 'error'" class="text-rose-400">{{ log.text }}</span>
      </div>

      <!-- Active Input Line -->
      <form @submit.prevent="() => executeCommand()" class="flex items-center gap-2 pt-1">
        <span class="text-white font-bold select-none">$</span>
        <input
          ref="terminalInput"
          v-model="inputCommand"
          type="text"
          class="flex-1 bg-transparent text-green-400 outline-none font-pixel text-base sm:text-lg caret-green-400"
          placeholder="escribe un comando..."
          autocomplete="off"
          spellcheck="false"
        />
      </form>
    </div>
  </div>
</template>
