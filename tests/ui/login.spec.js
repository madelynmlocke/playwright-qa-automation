import { test, expect } from '@playwright/test';

test.describe('Login Validation Tests', () => {

  test('login page loads and displays login form', async ({ page }) => {

    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
      await expect(page).toHaveURL(/\/login$/);
    });

    await test.step('Verify login page heading is visible', async () => {
      await expect(page.getByRole('heading', { name: /Login to your account/i }).first()).toBeVisible();
    });

    await test.step('Verify login form fields are visible', async () => {
      await expect(page.locator('input[data-qa="login-email"]')).toBeVisible();
      await expect(page.locator('input[data-qa="login-password"]')).toBeVisible();
      await expect(page.locator('[data-qa="login-button"]')).toBeVisible();
    });

  });

  test('login shows error for invalid credentials', async ({ page }) => {

    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
      await expect(page.locator('input[data-qa="login-email"]')).toBeVisible();
    });

    await test.step('Enter invalid login credentials', async () => {
      await page.fill('input[data-qa="login-email"]', 'fakeuser@example.com');
      await page.fill('input[data-qa="login-password"]', 'wrongpassword');
    });

    await test.step('Submit login form', async () => {
      await page.click('[data-qa="login-button"]');
    });

    await test.step('Verify login error message appears', async () => {
      const loginError = page.locator('.login-form p').filter({ hasText: 'incorrect' }).first();

      await expect(loginError).toBeVisible();
      await expect(loginError).toContainText('incorrect');
      await expect(page).toHaveURL(/\/login/);
    });

  });

});