/**
 * @file src/AppRoutes.jsx
 * @author Stephen Boyett
 * @company Cannasol Technologies
 * @date 2026-03-29
 * @version 1.0
 * @brief Route definitions for the Nano Mushrooms landing page.
 *
 * @description
 * Lazy-loads all page components for code splitting. Provides ScrollToTop
 * for route changes and PrerenderReady to signal the prerenderer when
 * Helmet has finished injecting per-page meta tags.
 *
 * Routes:
 *   /         -> MushroomsLandingPage (main landing page)
 *   /faq      -> FAQPage
 *   /contact  -> ContactPage
 *   *         -> NotFoundPage (404)
 */
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

const MushroomsLandingPage = lazy(() => import('./components/MushroomsLandingPage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Signal to the prerenderer that the page is fully rendered.
// Polls for Helmet's data-rh tags instead of using a fixed delay,
// so lazy routes that take longer to load still get correct meta tags.
function PrerenderReady() {
  useEffect(() => {
    const MAX_WAIT = 10000;
    const POLL_INTERVAL = 100;
    let elapsed = 0;

    const poll = setInterval(() => {
      elapsed += POLL_INTERVAL;
      const hasHelmet = document.querySelector('[data-rh="true"]');
      if (hasHelmet || elapsed >= MAX_WAIT) {
        clearInterval(poll);
        document.dispatchEvent(new Event('app-rendered'));
      }
    }, POLL_INTERVAL);

    return () => clearInterval(poll);
  }, []);
  return null;
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ScrollToTop />
      <PrerenderReady />
      <Routes>
        <Route path="/" element={<MushroomsLandingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
