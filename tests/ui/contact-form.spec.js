import { test, expect } from '@playwright/test';

test.describe('Contact Form Validation Tests', () => {

  test('contact form fields are visible', async ({ page }) => {

    await test.step('Navigate to contact page', async () => {
      await page.goto('/contact_us');
      await expect(page).toHaveURL(/\/contact_us$/);
      await expect(page.locator('text=Get In Touch')).toBeVisible();
    });

    await test.step('Verify contact form fields are visible', async () => {
      await expect(page.locator('[data-qa="name"]')).toBeVisible();
      await expect(page.locator('[data-qa="email"]')).toBeVisible();
      await expect(page.locator('[data-qa="subject"]')).toBeVisible();
      await expect(page.locator('[data-qa="message"]')).toBeVisible();
      await expect(page.locator('[data-qa="submit-button"]')).toBeVisible();
    });

  });

  test('contact form accepts valid input and submits successfully', async ({ page }) => {

    await test.step('Navigate to contact page', async () => {
      await page.goto('/contact_us');
    });

    await test.step('Fill out contact form with valid input', async () => {
      await page.fill('[data-qa="name"]', 'Maddy Locke');
      await page.fill('[data-qa="email"]', 'maddy@example.com');
      await page.fill('[data-qa="subject"]', 'QA Automation Test');
      await page.fill('[data-qa="message"]', 'This is a Playwright test submission.');
    });

    await test.step('Handle confirmation dialog', async () => {
      page.once('dialog', async (dialog) => {
        await dialog.accept();
      });
    });

    await test.step('Submit the form', async () => {
      await page.click('[data-qa="submit-button"]');
    });

    await test.step('Verify successful submission message appears', async () => {
      await expect(page.locator('.status.alert.alert-success')).toBeVisible();
    });

  });

});