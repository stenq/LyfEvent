import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Your backend server
        changeOrigin: true,
        secure: false, // Use only if your server uses self-signed certificates
      },
      '/media': {
        target: 'http://127.0.0.1:8000', // Your backend server
        changeOrigin: true,
        secure: false, // Use only if your server uses self-signed certificates
      },
    },
  },
});