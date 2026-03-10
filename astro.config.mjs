// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://velixai.cloud',
  integrations: [react(), sitemap()],
  server: {
    host: '127.0.0.1',
    port: 4321
  },
  vite: {
    plugins: [tailwindcss()]
  }
});