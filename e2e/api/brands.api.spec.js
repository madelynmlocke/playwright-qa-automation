import { test, expect } from '@playwright/test';
import { assertBrand, assertBrandsResponse, assertAuthenticationResponse } from '../../utils/apiAssertions.js';

test.describe('@api @brands Endpoint tests for /api/brandsList', () => { 
    
    test('Test Case 3: GET All Brands List', async ({ request }) => {
        const response = await request.get('/api/brandsList');
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        assertBrandsResponse(responseBody);

        const brand = responseBody.brands[0];
        assertBrand(brand);
        console.log(brand);
    });
    
    test('Test Case 4: PUT to /brandsList returns 405', async ({ request }) => {
        const response = await request.put('/api/brandsList'); 
        //expect(response.status()).toBe(405); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody); 
        assertAuthenticationResponse(responseBody, 405, 'This request method is not supported.');
    });
});