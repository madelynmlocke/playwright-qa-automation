import { test, expect } from '@playwright/test';

test.describe('Endpoint tests for /searchProduct', () => {
    //TEST HTTP 200 Response when requested WITH search parameters
    test('POST to Search Product with parameter', async ({ request }) => {
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
    //TEST HTTP 400 Response when requested WITHOUT search parameters
    test('POST to Search Product without parameter', async ({ request }) => {
        const response = await request.post('/api/searchProduct');
        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });
});