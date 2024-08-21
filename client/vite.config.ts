import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:' + (process.env.API_PORT || 999),
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'ws://localhost:' + (process.env.API_PORT || 999),
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true
  }
});
