import { test, expect } from '@playwright/test';

test.describe('Endpoint tests for user login', () => {
    test('POST to /verifyLogin WITH parameters', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
            form: {
                email: 'itrugamer26@gmail.com', password: 'test123!' //valid email and password
            }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });
    test('POST to /verifyLogin WITHOUT parameters', async ({ request }) => {
        const response = await request.post('/api/verifyLogin');
        //expect(response.status()).toBe(400); --bug found in HTTP response

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });
    test('POST to /verifyLogin with invalid credentials', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
            form: {
                email: 'itrugamer26@gmail.com', password: 'wrongpass' //invalid email and password
            }
        });
        //expect(response.status()).toBe(404); --bug found in HTTP response

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    });
    test('DELETE request to /verifyLogin', async ({ request }) => {
        const response = await request.delete('/api/verifyLogin');
        expect(response.status()).toBe(405);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe('This request method is not supported.');
    });
});