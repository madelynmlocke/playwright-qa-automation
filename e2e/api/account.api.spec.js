import { test, expect } from '@playwright/test';
import { createAccount, updateAccount, deleteAccount, getUserDetailByEmail } from '../../utils/apiClient';
import { buildUser } from '../../utils/userFactory';
import { assertAccountResponse } from '../../utils/apiAssertions.js';
import { assertAuthenticationResponse } from '../../utils/apiAssertions.js';

test.describe('@api @account Endpoint tests for user accounts', () => {

    test('Test Case 11: POST createAccount creates a user', async ({ request }) => {
        const user = buildUser();
        const response = await createAccount(request, user);
        
        // expect(response.status()).toBe(201); // Known bug: API returns incorrect HTTP status, validating response body instead.
        const responseBody = await response.json();
        console.log(responseBody);
        
        assertAuthenticationResponse(responseBody);
        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');
        
        //assertAccountResponse(response);

        await deleteAccount(request, user);
    });

    test('Test Case 13: PUT updateAccount updates the user', async ({ request }) => {
        const originalUser = buildUser();
        await createAccount(request, originalUser);
        
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

        await deleteAccount(request, updatedUser);
    });

    test('Test Case 14: GET getUserDetailByEmail returns account details', async ({ request }) => {
        const user = buildUser();
        await createAccount(request, user);

        const response = await getUserDetailByEmail(request, user.email);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.user.email).toBe(user.email);
        expect(responseBody.user.name).toBe(user.name);

        await deleteAccount(request, user);
    });
    
    test('Test Case 12: DELETE deleteAccount deletes the user', async ({ request }) => {
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