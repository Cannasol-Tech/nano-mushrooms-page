# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cannasol Technologies' Nano Mushrooms landing page — a React SPA for marketing nanoemulsified functional mushroom products. Deployed to Firebase Hosting with static prerendering for SEO.

## Commands

```bash
npm run dev          # Dev server on localhost:3001 (auto-opens browser)
npm run build        # Production build with Puppeteer-based prerendering to dist/
npm run test         # Run tests once (vitest run)
npm run test:watch   # Run tests in watch mode (vitest)
SKIP_PRERENDER=1 npm run build  # Build without prerendering (faster, no Puppeteer)
```

Deploy: `firebase deploy` (serves from `dist/`)

## Architecture

**Stack:** Vite + React 18 + Tailwind CSS 3 + react-router-dom v7. No state management library — just React context.

**Routing:** `AppRoutes.jsx` lazy-loads all page components. Routes: `/` (landing), `/faq`, `/contact`, `*` (404). Adding a new route requires updating both `AppRoutes.jsx` and the `routes` array in `vite.config.js` (for prerendering).

**Theming:** `ThemeContext` provides `isDark`/`setIsDark`. Theme tokens (Tailwind classes) are defined in `src/theme/themes.js` as `themes.dark.*` / `themes.light.*`. Components consume theme via `const t = themes[isDark ? 'dark' : 'light']` and apply token strings directly as className values.

**SEO / Prerendering:** `react-helmet-async` manages per-page meta tags. At build time, `vite-plugin-prerender-k` uses Puppeteer to render each route to static HTML. `PrerenderReady` in `AppRoutes.jsx` polls for Helmet's `data-rh` attribute then dispatches `app-rendered` to signal the prerenderer. `main.jsx` detects prerendered HTML and hydrates instead of full-rendering. The build post-processor deduplicates static meta tags that conflict with Helmet-injected ones.

**Canvas Animation:** `NanoScene.jsx` renders a full-viewport background with 3D rotating Fibonacci-distributed nanoemulsion spheres and ambient particles. Uses offscreen canvases (spheres at 30fps composited at 60fps), IntersectionObserver to pause when offscreen, cached vignette overlay, and squared-distance checks to avoid sqrt in tight loops. Animation callbacks register through `src/utils/animationLoop.js` — a centralized rAF loop that auto-pauses on tab hide.

**Analytics:** Google Tag Manager (GTM-57TMCR6T) via `src/utils/gtag.js`. Events push to `window.dataLayer`. Page views tracked on route change in `App.jsx`. Conversion events: `form_submission`, `phone_click`, `email_click`.

## Testing

Tests use Vitest + jsdom + React Testing Library. Setup file at `src/test/setupTests.js` mocks `IntersectionObserver` and `ResizeObserver` for jsdom. Route tests wrap components in `HelmetProvider > MemoryRouter > ThemeProvider`.

## Brand Colors

Cannasol brand: emerald/teal accent (`from-emerald-500 to-teal-500`), dark mode default (`bg-slate-950`). Custom colors in `tailwind.config.js` under `cannasol.*`. The blue/cyan particle + golden sphere core palette in NanoScene matches the nano-kava sister site.
