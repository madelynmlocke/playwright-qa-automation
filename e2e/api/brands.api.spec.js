import { test, expect } from '@playwright/test';

test.describe('Endpoint tests for /api/brandsList', () => { 
    test('GET All Brands List', async ({ request }) => {

        const response = await request.get('/api/brandsList');
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        //console.log(responseBody);
        expect(responseBody).toHaveProperty('brands');
        expect(Array.isArray(responseBody.products)).toBeTruthy(); //Checks if 'brands' is an array
        expect(responseBody.products.length).toBeGreaterThan(0); //Checks if 'brands' array length is greater than 0 

        const firstBrand = responseBody.brands[0];
        expect(firstBrand).toHaveProperty('id');
        expect(firstBrand).toHaveProperty('brand');
    });
    test('PUT to /brandsList returns 405', async ({ request }) => {
        const response = await request.put('/api/brandsList'); 
        expect(response.status()).toBe(405); //Checks HTTP Response Status

        const responseBody = await response.json(); //Turns response body into JSON
        expect(responseBody.responseCode).toBe(405); //Checks if responseCode property displays 405
    });
});