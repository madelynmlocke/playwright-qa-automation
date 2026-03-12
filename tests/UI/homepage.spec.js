import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('homepage smoke test verifies key content and navigation elements', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(page).toHaveTitle(/Automation Exercise/i);

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    const logo = page.locator('img[alt="Website for automation practice"]');
    await expect(logo).toBeVisible();

    const navLinks = [
      'Home',
      'Products',
      'Cart',
      'Signup / Login',
      'Test Cases',
      'API Testing',
      'Video Tutorials',
      'Contact us'
    ];

    for (const linkText of navLinks) {
      await expect(page.locator(`a:has-text("${linkText}")`).first()).toBeVisible();
    }

    await expect(page.locator('text=Full-Fledged practice website for Automation Engineers')).toBeVisible();
  });
});