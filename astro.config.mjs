import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

import react from '@astrojs/react';

export default defineConfig({
  output: 'server',

  adapter: node({
    mode: 'standalone',
  }),

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '>': resolve('./src'),
        '<': resolve('./'),
      },
    },
  },

  integrations: [react()],
});