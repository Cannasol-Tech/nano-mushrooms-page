/**
 * @file src/main.jsx
 * @author Stephen Boyett
 * @company Cannasol Technologies
 * @date 2026-03-29
 * @version 1.0
 * @brief Application entry point with hydration support for prerendered HTML.
 *
 * @description
 * Detects whether pre-rendered HTML exists in the root element and hydrates
 * if so; otherwise performs a full client-side render. This supports the
 * vite-plugin-prerender-k static prerendering pipeline.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (root.hasChildNodes()) {
  // Pre-rendered HTML exists — hydrate to preserve it
  ReactDOM.hydrateRoot(root, <React.StrictMode><App /></React.StrictMode>);
} else {
  // Dev server or fallback — full client render
  ReactDOM.createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
}
