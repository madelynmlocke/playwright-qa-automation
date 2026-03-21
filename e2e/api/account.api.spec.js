import { test, expect } from '@playwright/test';
import { createAccount, updateAccount, deleteAccount, getUserDetailByEmail } from '../../utils/apiClient';
import { buildUser } from '../../utils/userFactory';

test.describe('Endpoint tests for user accounts', () => {
    test('POST createAccount creates a user', async ({ request }) => {
        const user = buildUser();
        const response = await createAccount(request, user);
        
        // expect(response.status()).toBe(201); ----BUG ID 001

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');
    });
    test('PUT updateAccount updates the user', async ({ request }) => {
        const originalUser = buildUser();

        await createAccount(request, originalUser);

        // update just the birth year
        const updatedUser = {
            ...originalUser,
            birth_year: '1992'
        };

        const response = await updateAccount(request, updatedUser);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User updated!');
    });
    test('GET getUserDetailByEmail returns account details', async ({ request }) => {
        const user = buildUser();

        await createAccount(request, user);

        const response = await getUserDetailByEmail(request, user.email);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        //expect(responseBody.message).toBe('User Detail');
    });
    test('DELETE deleteAccount deletes the user', async ({ request }) => {
        // create user
        const user = buildUser();

        await createAccount(request, user);

        // delete same user
        const response = await deleteAccount(request, user);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('Account deleted!');
    });
});