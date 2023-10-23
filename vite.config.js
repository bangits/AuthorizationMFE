import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const packageJSON = require('./package.json');

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'styled-system': path.resolve(__dirname, './styled-system')
    }
  },
  plugins: [react()],
  preview: {
    port: 9001
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/atom-authorization.tsx'),
      formats: ['system'],
      fileName: () => 'atom-authorization.js'
    },
    rollupOptions: {
      external: [...packageJSON.externalDeps, 'react', 'react-dom', /^@atom/],
      output: {
        intro: `const process = {env: ${JSON.stringify(process.env)}}`
      }
    }
  }
});
