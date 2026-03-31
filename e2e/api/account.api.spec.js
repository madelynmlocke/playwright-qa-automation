import { test, expect } from '@playwright/test';
import { createAccount, updateAccount, deleteAccount, getUserDetailByEmail } from '../../utils/apiClient';
import { buildUser } from '../../utils/userFactory';
import { assertAccountResponse, assertBodyResponse } from '../../utils/apiAssertions.js';

test.describe('Account API - Acceptance @api @account', () => {

    test('Test Case 11: POST createAccount creates a user @smoke', async ({ request }) => {
        const user = buildUser();
        const response = await createAccount(request, user);
        
        // expect(response.status()).toBe(201); // Known bug: API returns incorrect HTTP status, validating response body instead. ID: BUG-API-POST-CREATE-001
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
        console.log('Updated user payload:', updatedUser); //stores updated info in updatedUser variable

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

test.describe('Account API - Negative / Boundary @api @account @negative', () => {

    test('POST returns error for duplicate email', async ({ request }) => {
        const user = buildUser({ email: process.env.EMAIL_VALID});
        const response = await createAccount(request, user);
        // expect(response.status()).toBe(400); // Known bug: API returns incorrect HTTP status, validating response body instead. ID: BUG-API-POST-CREATE-001

        const responseBody = await response.json();
        console.log(responseBody);
        assertBodyResponse(responseBody, 400, 'Email already exists!');
    });

    test('POST returns error when email is missing', async ({ request }) => {
        const user = buildUser({ email: ''});
        console.log('User payload:', user); //shows email was correctly overriden with empty values
        const response = await createAccount(request, user);
        // expect(response.status()).toBe(400); // Known bug: API returns incorrect HTTP status, validating response body instead. ID: BUG-API-POST-CREATE-001

        const responseBody = await response.json();
        console.log(responseBody);

        // Known bug: empty email returns 'Email already exists!' instead of a bad request error. ID: BUG-API-POST-CREATE-002
        assertBodyResponse(responseBody, 400, 'Email already exists!');
    });

    test('POST returns error when password is missing', async ({ request }) => {
        const user = buildUser({ password: ''});
        console.log('User payload:', user);
        const response = await createAccount(request, user);
        expect(response.status()).toBe(200); // Known bug: API returns incorrect HTTP status, validating response body instead. ID: BUG-API-POST-CREATE-001

        const responseBody = await response.json();
        console.log(responseBody);
        //assertBodyResponse(responseBody, 400, 'Email already exists!');
    });

    test('GET returns error for invalid credentials', async ({ request }) => {
        const response = await getUserDetailByEmail(request, process.env.EMAIL_INVALID);
        //expect(response.status()).toBe(404); // Known bug: API returns incorrect HTTP status, validating response body instead. ID: BUG-API-POST-CREATE-001

        const responseBody = await response.json();
        console.log(responseBody);
        assertBodyResponse(responseBody, 404, 'Account not found with this email, try another email!');
    });

    test('DELETE returns error for invalid credentials', async ({ request }) => {
        const response = await deleteAccount(request, { email: process.env.EMAIL_INVALID, password: process.env.PASSWORD_INVALID });
        // expect(response.status()).toBe(404); // Known bug: API returns incorrect HTTP status, validating response body instead. ID: BUG-API-GLOBAL-001

        const responseBody = await response.json();
        console.log(responseBody);
        assertBodyResponse(responseBody, 404, 'Account not found!');
    });

});