import { test, expect } from '@playwright/test';
import { createAccount, updateAccount, deleteAccount, getUserDetailByEmail } from '../../utils/apiClient';
import { buildUser } from '../../utils/userFactory';
import { assertAccountResponse } from '../../utils/apiAssertions.js';
import { assertBodyResponse } from '../../utils/apiAssertions.js';

test.describe('Endpoint / integration tests for user accounts @api @account', () => {

    test('Test Case 11: POST createAccount creates a user @smoke', async ({ request }) => {
        const user = buildUser();
        const response = await createAccount(request, user);
        
        // expect(response.status()).toBe(201); // Known bug: API returns incorrect HTTP status, validating response body instead.
        const responseBody = await response.json();
        console.log(responseBody);

        assertBodyResponse(responseBody, 201, 'User created!');
        
        await deleteAccount(request, user);
    });

    test('Test Case 12: DELETE deleteAccount deletes the user @smoke', async ({ request }) => {
        // create user
        const user = buildUser();
        await createAccount(request, user);

        // delete same user
        const response = await deleteAccount(request, user);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);
        assertBodyResponse(responseBody, 200, 'Account deleted!')
    });

    test('Test Case 13: PUT updateAccount updates the user @regression', async ({ request }) => {
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

        assertBodyResponse(responseBody, 200, 'User updated!');

        await deleteAccount(request, updatedUser);
    });

    test('Test Case 14: GET getUserDetailByEmail returns account details @regression', async ({ request }) => {
        const user = buildUser();
        await createAccount(request, user);

        const response = await getUserDetailByEmail(request, user.email);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);

        assertAccountResponse(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.user.email).toBe(user.email);
        expect(responseBody.user.name).toBe(user.name);

        await deleteAccount(request, user);
    });

});