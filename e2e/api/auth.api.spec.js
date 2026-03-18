import { test, expect } from '@playwright/test';

test.describe('API tests for /api/verifyLogin', () => {
    //TEST HTTP 200 Response when requested WITH search parameters
    test('POST to /verifyLogin WITH parameters', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
            form: {
                email: 'itrugamer26@gmail.com', password: 'test123!'
            }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });
    //TEST HTTP 400 Response when requested WITHOUT search parameters
    test.only('POST to /verifyLogin WITHOUT parameters', async ({ request }) => {
        const response = await request.post('/api/verifyLogin');
        //expect(response.status()).toBe(400);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });
});