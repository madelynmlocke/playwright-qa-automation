import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {

  test('homepage smoke test verifies key content and navigation elements', async ({ page }) => {

    await page.goto('https://example.com');

    await expect(page).toHaveURL(/example\.com/);
    await expect(page).toHaveTitle(/Home|Example/i);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).not.toBeEmpty();

    const navLinks = ['Home', 'About', 'Contact'];
    for (const linkText of navLinks) {
      await expect(page.locator(`nav >> text=${linkText}`)).toBeVisible();
    }

    const primaryButton = page.locator('button, a')
      .filter({ hasText: /Get Started|Learn More|Contact/i })
      .first();

    await expect(primaryButton).toBeVisible();

  });

});