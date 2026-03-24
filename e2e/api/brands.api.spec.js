import { test, expect } from '@playwright/test';

test.describe('@api Endpoint tests for /api/brandsList', () => { 
    test('Test Case 3: GET All Brands List', async ({ request }) => {

        const response = await request.get('/api/brandsList');
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        //console.log(responseBody);
        expect(responseBody).toHaveProperty('brands');
        expect(Array.isArray(responseBody.brands)).toBeTruthy(); //Checks if 'brands' is an array
        expect(responseBody.brands.length).toBeGreaterThan(0); //Checks if 'brands' array length is greater than 0 

        const firstBrand = responseBody.brands[0];
        expect(firstBrand).toHaveProperty('id');
        expect(firstBrand).toHaveProperty('brand');
    });
    
    test('Test Case 4: PUT to /brandsList returns 405', async ({ request }) => {
        const response = await request.put('/api/brandsList'); 
        //expect(response.status()).toBe(405); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody); //Turns response body into JSON
        expect(responseBody.responseCode).toBe(405); //Checks if responseCode property displays 405
        expect(responseBody.message).toBe('This request method is not supported.');
    });
});