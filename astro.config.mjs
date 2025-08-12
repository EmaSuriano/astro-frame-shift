// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import compress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://emasuriano.github.io',
  base: 'astro-frame-shift',
  prefetch: { defaultStrategy: 'viewport' },
  integrations: [compress()],
  vite: {
    plugins: [tailwindcss()],
  },
  // Authorizing remote images https://images.unsplash.com/
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
});
