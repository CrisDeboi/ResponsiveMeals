import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { 
    environment: 'jsdom', // Cambia 'happy-dom' a 'jsdom'
    globals: true, // Habilita el uso de globales en las pruebas
    setupFiles: './src/setupTests.ts', // Apunta al archivo de configuración de jest-dom
  }
});
