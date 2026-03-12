import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('products navigation link redirects to products page', async ({ page }) => {
    await page.goto('/');

    const productsLink = page.locator('a[href="/products"]').first();
    await expect(productsLink).toBeVisible();

    await productsLink.click();

    await expect(page).toHaveURL(/\/products$/);
    await expect(page.locator('text=All Products')).toBeVisible();
  });

  test('contact us navigation link redirects to contact page', async ({ page }) => {
    await page.goto('/');

    const contactLink = page.locator('a[href="/contact_us"]').first();
    await expect(contactLink).toBeVisible();

    await contactLink.click();

    await expect(page).toHaveURL(/\/contact_us$/);
    await expect(page.locator('text=Get In Touch')).toBeVisible();
  });
});