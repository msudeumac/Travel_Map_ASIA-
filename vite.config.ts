
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // This allows the app to access the API_KEY from Vercel's environment
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
