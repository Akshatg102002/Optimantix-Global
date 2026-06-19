
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    // Removed specific HMR clientPort to allow auto-detection which works better for mixed environments
  },
  resolve: {
    alias: {
      '@': './'
    }
  }
});
