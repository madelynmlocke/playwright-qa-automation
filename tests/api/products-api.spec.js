import { test, expect } from '@playwright/test';

test.describe('AutomationExercise API Tests', () => {

  test('products API returns successful response with product data', async ({ request }) => {

    const response = await request.get('/api/productsList');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBeTruthy();
    expect(responseBody.products.length).toBeGreaterThan(0);

    const firstProduct = responseBody.products[0];

    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
    expect(firstProduct).toHaveProperty('availability');

  });

  test('invalid API endpoint returns 404 or error response', async ({ request }) => {

    const response = await request.get('/api/invalidEndpoint');

    expect(response.status()).toBeGreaterThanOrEqual(400);

  });

});