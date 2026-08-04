// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://insolvagroup.com',
  // "static" + prerender:false puntual en /api/*.ts: todo el sitio sigue
  // siendo HTML estático, solo los endpoints de IA corren como función serverless.
  output: 'static',
  adapter: netlify(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
