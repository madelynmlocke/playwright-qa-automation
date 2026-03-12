import { test, expect } from '@playwright/test';

test.describe('Login Validation Tests', () => {
  test('login page loads and displays login form', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('text=Login to your account')).toBeVisible();

    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
    await expect(page.locator('[data-qa="login-password"]')).toBeVisible();
    await expect(page.locator('[data-qa="login-button"]')).toBeVisible();
  });

  test('login shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-qa="login-email"]', 'fakeuser@example.com');
    await page.fill('[data-qa="login-password"]', 'wrongpassword');
    await page.click('[data-qa="login-button"]');

    await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});