
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // Shims process.env for the browser to support the Gemini SDK requirements
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
