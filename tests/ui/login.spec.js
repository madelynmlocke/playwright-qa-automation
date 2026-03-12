import { test, expect } from '@playwright/test';

test.describe('Login Validation Tests', () => {
  test('login page loads and displays login form', async ({ page }) => {

    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
      await expect(page).toHaveURL(/\/login$/);
    });

    await test.step('Verify login page heading is visible', async () => {
      await expect(page.locator('text=Login to your account')).toBeVisible();
    });

    await test.step('Verify login form fields are visible', async () => {
      await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
      await expect(page.locator('[data-qa="login-password"]')).toBeVisible();
      await expect(page.locator('[data-qa="login-button"]')).toBeVisible();
    });

  });

  test('login shows error for invalid credentials', async ({ page }) => {

    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
    });

    await test.step('Enter invalid login credentials', async () => {
      await page.fill('[data-qa="login-email"]', 'fakeuser@example.com');
      await page.fill('[data-qa="login-password"]', 'wrongpassword');
    });

    await test.step('Submit login form', async () => {
      await page.click('[data-qa="login-button"]');
    });

    await test.step('Verify login error message appears', async () => {
      await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
      await expect(page).toHaveURL(/\/login$/);
    });

  });

});