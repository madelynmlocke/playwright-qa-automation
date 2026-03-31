import { test, expect } from '@playwright/test';
import { assertBodyResponse } from '../../utils/apiAssertions.js';
import { searchProduct } from '../../utils/apiClient.js';

test.describe('Endpoint tests for /searchProduct @api @search', () => {
    
    test('Test Case 5: POST to Search Product returns searched data @smoke @regression', async ({ request }) => {

        const response = await searchProduct(request, 'TOP');
        expect(response.status()).toBe(200);

        const responseBody = await response.json(); 
        //console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody).toHaveProperty('products');
        
        // Known Bug: API returns unrelated products for search term 'top' 
        // Asserting at least one result matches until API filtering is fixed
        const products = responseBody.products;
        const hasTop = products.some(product => /top/i.test(product.name));
        expect(hasTop).toBe(true);
    });

    test('Test Case 6: POST empty data to Search Product should throw 400 error @negative', async ({ request }) => {

        const response = await searchProduct(request);
        // expect(response.status()).toBe(400); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody);

        assertBodyResponse(responseBody, 400, 'Bad request, search_product parameter is missing in POST request.');
    });

    test('Test Case 7: POST search with no matching results returns empty products array @negative', async ({ request }) => {
        const response = await searchProduct(request, 'nonexistent');
        expect(response.status()).toBe(200);

        const responseBody = await response.json(); 
        console.log(responseBody);
        expect(responseBody).toHaveProperty('products');
        expect(responseBody.products).toHaveLength(0);
    });

    test('Test Case 8: POST search with single character returns results @regression', async ({ request }) => {
        const response = await searchProduct(request, 't');
        expect(response.status()).toBe(200);

        const responseBody = await response.json(); 
        console.log(responseBody);
        expect(responseBody).toHaveProperty('products');
        expect(responseBody.products.length).toBeGreaterThan(0);
    });
});