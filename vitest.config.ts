// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Asegúrate de que el entorno sea jsdom
    globals: true,         // Habilitar funciones globales de Vitest
    setupFiles: ['./src/setupTests.ts'],
  },
  
});
