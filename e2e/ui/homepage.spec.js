import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {

  test('homepage smoke test verifies key content and navigation elements', async ({ page }) => {

    await test.step('Navigate to homepage', async () => {
      await page.goto('/');
      await expect(page).toHaveURL(/automationexercise\.com\/?$/);
      await expect(page).toHaveTitle(/Automation Exercise/i);
    });

    await test.step('Verify core page layout elements', async () => {
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    await test.step('Verify site logo is visible', async () => {
      const logo = page.locator('img[alt="Website for automation practice"]');
      await expect(logo).toBeVisible();
    });

    await test.step('Verify primary navigation links', async () => {
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
    });

    await test.step('Verify homepage hero heading appears', async () => {
      await expect(
        page.getByRole('heading', {
          name: /Full-Fledged practice website for Automation Engineers/i
        }).first()
      ).toBeVisible();
    });

  });

});