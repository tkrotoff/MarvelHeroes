import { chromium, expect, test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test('Heroes page', async () => {
  const debugPort = 9222;

  const browser = await chromium.launch({ args: [`--remote-debugging-port=${debugPort}`] });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/0');

  await expect(page).toHaveTitle('Page 0 - Marvel Heroes');
  await expect(page.getByRole('button', { name: '‹ Previous', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Next ›', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '3-D Man', exact: true })).toBeVisible();

  await playAudit({
    page,
    port: debugPort,
    thresholds: {
      performance: 40,
      accessibility: 92,
      // Instead of 92 because Sentry sometimes generates a 429 which is logged in the console
      // https://github.com/getsentry/sentry-javascript/issues/3066
      'best-practices': 83,
      seo: 100,
      pwa: 80
    },
    reports: {
      name: `Heroes-page_0-${Date.now()}`,
      formats: { html: true }
    }
  });

  await browser.close();
});

test('Hero page', async () => {
  const debugPort = 9223;

  const browser = await chromium.launch({ args: [`--remote-debugging-port=${debugPort}`] });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/heroes/1011334');

  await expect(page).toHaveTitle('3-D Man - Marvel Heroes');
  await expect(page.getByRole('heading', { name: '3-D Man', exact: true })).toBeVisible();

  await playAudit({
    page,
    port: debugPort,
    thresholds: {
      performance: 40,
      accessibility: 96,
      // Instead of 92 because Sentry sometimes generates a 429 which is logged in the console
      // https://github.com/getsentry/sentry-javascript/issues/3066
      'best-practices': 83,
      seo: 100,
      pwa: 80
    },
    reports: {
      name: `Hero-page_1011334-${Date.now()}`,
      formats: { html: true }
    }
  });

  await browser.close();
});
