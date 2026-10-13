import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://ab-s0lution.github.io/Boulangerie-P-tisserie-Maison-B-cam---Rennes/
// Multi-page build: one HTML entry per route (see scripts/gen-pages.mjs).
const pages = [
  'index.html',
  'la-carte/index.html',
  'produit/index.html',
  'choc-o-roi/index.html',
  'la-journee/index.html',
  'commandes-evenements/index.html',
  'click-and-collect/index.html',
  'la-maison/index.html',
  'le-quartier/index.html',
  'journal/index.html',
  'journal/article/index.html',
  'galerie/index.html',
  'avis/index.html',
  'fidelite/index.html',
  'faq/index.html',
  'contact/index.html',
  'mentions-legales/index.html',
  'confidentialite/index.html',
]

export default defineConfig({
  base: '/Boulangerie-P-tisserie-Maison-B-cam---Rennes/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p === 'index.html' ? 'index' : p.replace('/index.html', '').replace(/\//g, '-'), fileURLToPath(new URL(p, import.meta.url))])),
    },
  },
})
