import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    define: {
      // The footer shows this year in the prerendered HTML, then the current one
      __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    },
    build: {
      // scripts/prerender.mjs reads it to preload each page's code, then deletes it
      manifest: true,
      // Font subsets the site never uses (e.g. Cyrillic) stay separate files that are
      // never downloaded, instead of being inlined into the render-blocking CSS
      assetsInlineLimit: (file: string) => (file.endsWith('.woff2') ? false : undefined),
    },
  };
});
