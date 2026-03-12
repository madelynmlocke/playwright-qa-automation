import { test, expect } from '@playwright/test';

test.describe('Contact Form Validation Tests', () => {
  test('contact form fields are visible', async ({ page }) => {
    await page.goto('/contact_us');

    await expect(page).toHaveURL(/\/contact_us$/);
    await expect(page.locator('text=Get In Touch')).toBeVisible();

    await expect(page.locator('[data-qa="name"]')).toBeVisible();
    await expect(page.locator('[data-qa="email"]')).toBeVisible();
    await expect(page.locator('[data-qa="subject"]')).toBeVisible();
    await expect(page.locator('[data-qa="message"]')).toBeVisible();
    await expect(page.locator('[data-qa="submit-button"]')).toBeVisible();
  });

  test('contact form accepts valid input and submits successfully', async ({ page }) => {
    await page.goto('/contact_us');

    await page.fill('[data-qa="name"]', 'Maddy Locke');
    await page.fill('[data-qa="email"]', 'maddy@example.com');
    await page.fill('[data-qa="subject"]', 'QA Automation Test');
    await page.fill('[data-qa="message"]', 'This is a Playwright test submission.');

    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.click('[data-qa="submit-button"]');

    await expect(page.locator('.status.alert.alert-success')).toBeVisible();
  });
});