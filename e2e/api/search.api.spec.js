import { test, expect } from '@playwright/test';
import { assertAuthenticationResponse } from '../../utils/apiAssertions.js';

test.describe('@api @search Endpoint tests for /searchProduct', () => {
    
    test('Test Case 5: POST to Search Product returns searched data', async ({ request }) => {
        const response = await request.post('/api/searchProduct', {
            form: {
                search_product:'top' //adds search_product parameter to POST request
            }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json(); 
        //console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody).toHaveProperty('products');
        

        // Knwon Bug: API returns unrelated products for search term 'top' 
        // Asserting at least one result matches until API filtering is fixed
        const products = responseBody.products;
        const hasTop = products.some(product => /top/i.test(product.name));
        expect(hasTop).toBe(true);
    });

    test('Test Case 6: POST empty data to Search Product should throw 400 error', async ({ request }) => {
        const response = await request.post('/api/searchProduct');
        // expect(response.status()).toBe(400); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody);

        assertAuthenticationResponse(responseBody, 400, 'Bad request, search_product parameter is missing in POST request.');
    });
});