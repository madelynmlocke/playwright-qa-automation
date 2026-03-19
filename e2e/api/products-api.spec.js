import { test, expect } from '@playwright/test';

test.describe('AutomationExercise /productsList Tests', () => {
  test('products API returns successful response with product data', async ({ request }) => {
      const response = await request.get('/api/productsList');
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      console.log(responseBody); //Get All Products List in console
      expect(responseBody).toHaveProperty('products');
      expect(Array.isArray(responseBody.products)).toBeTruthy(); //Checks if 'products' is an array
      expect(responseBody.products.length).toBeGreaterThan(0); //Checks if 'products' array is greater than 0 


      const firstProduct = responseBody.products[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('brand');
      expect(firstProduct).toHaveProperty('category');

  });
  test('invalid API endpoint returns 404 or error response', async ({ request }) => {
    const response = await request.get('/api/invalidEndpoint');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
  test('POST to /productsList returns 405', async ({ request, page }) => {
    //await page.pause(); 
    const response = await request.post('/api/productsList');
    expect(response.status()).toBe(405);
    const responseBody = await response.json();
  });
});