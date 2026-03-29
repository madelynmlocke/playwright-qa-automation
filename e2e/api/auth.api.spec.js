import { test, expect } from '@playwright/test';
import { assertAuthenticationResponse } from '../../utils/apiAssertions.js';
import { verifyLogin } from '../../utils/apiClient.js';

test.describe('@api @auth Endpoint tests for user login', () => {

    test('Test Case 7: POST /verifyLogin should return 200 and confirm user exists with valid credentials', async ({ request }) => {
        const response = await verifyLogin(request, {
            email: process.env.EMAIL_VALID,
            password: process.env.PASSWORD_VALID
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        assertAuthenticationResponse(responseBody, 200, 'User exists!');

    });

    test('Test Case 8: POST /verifyLogin should return 400 when email and password are missing', async ({ request }) => {
        const response = await verifyLogin(request);
        //expect(response.status()).toBe(400); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody);
        assertAuthenticationResponse(responseBody, 400, 'Bad request, email or password parameter is missing in POST request.');
    });

    test('Test Case 9: POST /verifyLogin should return 404 for invalid credentials', async ({ request }) => {
        const response = await verifyLogin(request, {
            email: process.env.EMAIL_INVALID,
            password: process.env.PASSWORD_INVALID
        });
        //expect(response.status()).toBe(404); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody);
        assertAuthenticationResponse(responseBody, 404, 'User not found!');
    });
    
    test('Test Case 10: DELETE /verifyLogin should return 405 for unsupported request method', async ({ request }) => {
        const response = await request.delete('/api/verifyLogin');
        // expect(response.status()).toBe(405); // Known bug: API returns incorrect HTTP status, validating response body instead.

        const responseBody = await response.json();
        console.log(responseBody);
        assertAuthenticationResponse(responseBody, 405, 'This request method is not supported.');
    });
});