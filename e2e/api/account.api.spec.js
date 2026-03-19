import { test, expect } from '@playwright/test';

test.describe('Endpoint tests for User Accounts', () => {
    test('POST createAccount creates a user', async ({ request }) => {
        const response = await request.post('/api/createAccount', {
            form: {
                name: 'tester',
                email: 'testymctester111@gmail.com', 
                password: 'test123!', 
                title: 'Mr',
                birth_date: '10',
                birth_month: '10',
                birth_year: '1990',
                firstname: 'Testy',
                lastname: 'McTester',
                company: '',
                address1: '510 1st Ave N',
                address2: '',
                country: 'United States',
                zipcode: '98109',
                state: 'WA',
                city: 'Seattle',
                mobile_number: '2065559999',
            }
        });
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');
    });
    test('PUT updateAccount updates the user', async ({ request }) => {
        const response = await request.put('/api/updateAccount', {
            form: {
                name: 'tester',
                email: 'testymctester111@gmail.com', 
                password: 'test123!', 
                title: 'Mr',
                birth_date: '10',
                birth_month: '10',
                birth_year: '1992',
                firstname: 'Testy',
                lastname: 'McTester',
                company: '',
                address1: '510 1st Ave N',
                address2: '',
                country: 'United States',
                zipcode: '98109',
                state: 'WA',
                city: 'Seattle',
                mobile_number: '2065559999',
            }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User updated!');
    });
    test('GET rgetUserDetailByEmail returns account details', async ({ request }) => {
        const response = await request.get('/api/getUserDetailByEmail', {
            params: {
                email: 'testymctester111@gmail.com'
            }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        //expect(responseBody.message).toBe('User Detail');
    });
    test('DELETE deleteAccount deletes the user', async ({ request }) => {
        const response = await request.delete('/api/deleteAccount', {
            form: {
                email: 'testymctester111@gmail.com',
                password: 'test1233!'
            }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('Account deleted!');
    });
});