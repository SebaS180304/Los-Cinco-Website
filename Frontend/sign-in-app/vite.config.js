import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // usar '/' para despliegue en dominio raíz
  build: {
    outDir: 'dist', // opcional: confirma que la carpeta de salida es 'dist'
  },
});