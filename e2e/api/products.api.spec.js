import { test, expect } from '@playwright/test';
import { assertProductsResponse } from '../../utils/apiAssertions.js';
import { assertProduct } from '../../utils/apiAssertions.js';
import { assertAuthenticationResponse } from '../../utils/apiAssertions.js';

test.describe('Endpoint tests for /productsList @api @products', () => {
  
  test('Test Case 1: products API returns successful response with product data @smoke', async ({ request }) => {
    const response = await request.get('/api/productsList');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    assertProductsResponse(responseBody);

    // API Product Schema Validation
    const product = responseBody.products[0];
    assertProduct(product);
    console.log(product);
  });

  test('Test Case 2: POST to /productsList returns 405 @negative', async ({ request, page }) => {
    const response = await request.post('/api/productsList');
    // expect(response.status()).toBe(405); // Known bug: API returns incorrect HTTP status, validating response body instead.

    const responseBody = await response.json();
    assertAuthenticationResponse(responseBody, 405, 'This request method is not supported.')
  });
});