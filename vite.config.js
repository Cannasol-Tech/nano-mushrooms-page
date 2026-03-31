/**
 * @file vite.config.js
 * @author Stephen Boyett
 * @company Cannasol Technologies
 * @date 2026-03-29
 * @version 1.0
 * @brief Vite build configuration for the Nano Mushrooms landing page.
 *
 * @description
 * Configures Vite with React plugin, static prerendering for SEO,
 * dev server settings, and Vitest test environment. Prerendering
 * uses Puppeteer to generate static HTML for all routes, with
 * post-processing to deduplicate meta tags injected by react-helmet-async.
 * The prerender plugin is loaded only during build (not in test/dev).
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isTest = process.env.VITEST || process.env.NODE_ENV === 'test';
const skipPrerender = process.env.SKIP_PRERENDER === '1';

async function getPrerenderPlugin() {
  if (isTest || skipPrerender) return null;
  const vitePrerender = (await import('vite-plugin-prerender-k')).default;
  const Renderer = vitePrerender.PuppeteerRenderer;
  return vitePrerender({
    staticDir: path.join(import.meta.dirname || '.', 'dist'),
    routes: ['/mushrooms/', '/mushrooms/faq', '/mushrooms/contact'],
    renderer: new Renderer({
      renderAfterDocumentEvent: 'app-rendered',
    }),
    postProcess(renderedRoute) {
      if (renderedRoute.html.includes('data-rh="true"')) {
        const tagsToDedup = [
          'name="description"',
          'property="og:title"',
          'property="og:description"',
          'property="og:url"',
        ];
        for (const attr of tagsToDedup) {
          const staticRegex = new RegExp(
            `<meta ${attr}(?![^>]*data-rh)[^>]*>`,
            'i'
          );
          renderedRoute.html = renderedRoute.html.replace(staticRegex, '');
        }
      }
      return renderedRoute;
    },
  });
}

export default defineConfig(async () => ({
  base: '/mushrooms/',
  plugins: [
    react(),
    await getPrerenderPlugin(),
  ].filter(Boolean),
  server: {
    port: 3001,
    open: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setupTests.js']
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
}));
