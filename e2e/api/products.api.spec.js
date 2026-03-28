import { test, expect } from '@playwright/test';
import { assertProductsResponse } from '../../utils/apiAssertions.js';
import { assertProduct } from '../../utils/apiAssertions.js';

test.describe('@api @products Endpoint tests for /productsList', () => {
  test('Test Case 1: products API returns successful response with product data', async ({ request }) => {
    const response = await request.get('/api/productsList');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    assertProductsResponse(responseBody);

    //API Product Schema Validation
    const product = responseBody.products[0];
    assertProduct(product);
  });

  test('Test Case 2: POST to /productsList returns 405', async ({ request, page }) => {
    const response = await request.post('/api/productsList');
    expect(response.status()).toBe(405);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });
});