import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base = nome do repo para funcionar no GitHub Pages
// (https://fabriciodorneles.github.io/readventure/)
export default defineConfig({
  plugins: [react()],
  base: '/readventure/',
});
