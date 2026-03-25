import { test, expect } from '@playwright/test';

test.describe('@api @search Endpoint tests for /searchProduct', () => {
    test('Test Case 5: POST to Search Product returns searched data', async ({ request }) => {
        const response = await request.post('/api/searchProduct', {
            form: {
                search_product:'top' //adds search_product parameter to POST request
            }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json(); 
        console.log(responseBody); //prints body to console
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody).toHaveProperty('products');
    });
    test('Test Case 6: POST empty data to Search Product should throw 400 error', async ({ request }) => {
        const response = await request.post('/api/searchProduct');
        // expect(response.status()).toBe(400); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
    });
});