import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {

  test('products navigation link redirects to products page', async ({ page }) => {

    await test.step('Navigate to homepage', async () => {
      await page.goto('/');
    });

    await test.step('Verify products navigation link is visible', async () => {
      const productsLink = page.locator('a[href="/products"]').first();
      await expect(productsLink).toBeVisible();
    });

    await test.step('Click products navigation link', async () => {
      const productsLink = page.locator('a[href="/products"]').first();
      await productsLink.click();
    });

    await test.step('Verify redirect to products page', async () => {
      await expect(page).toHaveURL(/\/products$/);
      await expect(page.locator('text=All Products')).toBeVisible();
    });

  });

  test('contact us navigation link redirects to contact page', async ({ page }) => {

    await test.step('Navigate to homepage', async () => {
      await page.goto('/');
    });

    await test.step('Verify contact navigation link is visible', async () => {
      const contactLink = page.locator('a[href="/contact_us"]').first();
      await expect(contactLink).toBeVisible();
    });

    await test.step('Click contact navigation link', async () => {
      const contactLink = page.locator('a[href="/contact_us"]').first();
      await contactLink.click();
    });

    await test.step('Verify redirect to contact page', async () => {
      await expect(page).toHaveURL(/\/contact_us$/);
      await expect(page.locator('text=Get In Touch')).toBeVisible();
    });

  });

});