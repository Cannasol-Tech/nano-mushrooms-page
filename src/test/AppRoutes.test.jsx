/**
 * @file src/test/AppRoutes.test.jsx
 * @author Stephen Boyett
 * @company Cannasol Technologies
 * @date 2026-03-29
 * @version 1.0
 * @brief Route-level smoke tests for the Nano Mushrooms landing page.
 *
 * @description
 * Verifies that each route renders its expected content: the mushrooms
 * landing page at /, FAQ at /faq, contact form at /contact, and the
 * 404 page for unknown paths.
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../context/ThemeContext';
import AppRoutes from '../AppRoutes';

function renderRoute(initialPath) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('AppRoutes', () => {
  it('renders the mushrooms landing page at /', async () => {
    renderRoute('/');

    expect(
      await screen.findByRole('heading', { name: /nanoemulsified\s+functional\s+mushrooms/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/lion's mane/i)).toBeInTheDocument();
    expect(screen.getByText(/reishi/i)).toBeInTheDocument();
    expect(screen.getByText(/cordyceps/i)).toBeInTheDocument();

    const contactSales = screen.getAllByRole('link', { name: /contact sales/i })[0];
    expect(contactSales).toHaveAttribute('href', '/contact');
  });

  it('renders the FAQ page at /faq', async () => {
    renderRoute('/faq');

    expect(
      await screen.findByRole('heading', { name: /frequently asked/i })
    ).toBeInTheDocument();
  });

  it('renders the contact page at /contact', async () => {
    renderRoute('/contact');

    expect(
      await screen.findByRole('heading', { name: /let's connect/i })
    ).toBeInTheDocument();
  });

  it('renders the 404 page for unknown paths', async () => {
    renderRoute('/nonexistent-page');

    expect(
      await screen.findByText(/404/i)
    ).toBeInTheDocument();
  });
});
