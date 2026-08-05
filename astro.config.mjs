// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://insolvagroup.com',
  // Sitio 100% estático: se publica subiendo dist/ al public_html de Hostinger,
  // sin adapter ni funciones serverless. La captación de leads (embudo, chat,
  // calculadora) vive en una landing aparte que sí corre sobre servidor.
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
