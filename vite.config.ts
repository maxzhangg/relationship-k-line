import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    base: '/relationship-k-line/', // Set to your repository name
    define: {
      // Critical fix: Use (env.API_KEY || '') to ensure JSON.stringify never receives undefined.
      // This guarantees that 'process.env.API_KEY' is replaced by a string in the browser bundle.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
    build: {
      outDir: 'dist',
    },
  };
});