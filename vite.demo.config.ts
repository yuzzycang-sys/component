import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Config for building the demo/docs site (GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: '/component/',
  build: {
    outDir: 'dist-demo',
  },
});
