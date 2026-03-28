import { test, expect } from '@playwright/test';
import { assertBrand, assertBrandsResponse, assertAuthenticationResponse } from '../../utils/apiAssertions.js';

test.describe('@api @brands Endpoint tests for /api/brandsList', () => { 
    
    test('Test Case 3: GET All Brands List', async ({ request }) => {

        const response = await request.get('/api/brandsList');
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        //console.log(responseBody);
        assertBrandsResponse(responseBody)

        const brand = responseBody.brands[0];
        assertBrand(brand);

    });
    
    test('Test Case 4: PUT to /brandsList returns 405', async ({ request }) => {
        const response = await request.put('/api/brandsList'); 
        //expect(response.status()).toBe(405); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody); //Turns response body into JSON
        assertAuthenticationResponse(responseBody);
        expect(responseBody.responseCode).toBe(405); //Checks if responseCode property displays 405
        expect(responseBody.message).toBe('This request method is not supported.');
    });
});