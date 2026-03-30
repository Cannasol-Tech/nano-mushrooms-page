/**
 * @file src/App.jsx
 * @author Stephen Boyett
 * @company Cannasol Technologies
 * @date 2026-03-29
 * @version 1.0
 * @brief Root application component with routing, theming, and analytics.
 *
 * @description
 * Wraps the app in HelmetProvider (SEO), BrowserRouter, and ThemeProvider.
 * AppContent handles page-view tracking on route changes and applies the
 * current theme background. Unlike the kava site, this project has no
 * canvas-based 3D background — just a simple themed background layer.
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './AppRoutes';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { trackPageView } from './utils/gtag';
import './index.css';

function AppContent() {
  const { isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    // Delay so react-helmet-async updates document.title first
    const id = setTimeout(() => trackPageView(location.pathname, document.title), 0);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Themed background layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`} />
      </div>
      {/* Page content */}
      <AppRoutes />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
