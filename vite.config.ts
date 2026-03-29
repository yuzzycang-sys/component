import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CetusUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `cetus-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          'lucide-react': 'LucideReact',
        },
      },
    },
  },
});
