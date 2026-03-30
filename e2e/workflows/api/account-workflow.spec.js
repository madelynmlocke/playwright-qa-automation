import { test, expect } from '@playwright/test';
import { createAccount, updateAccount, deleteAccount, getUserDetailByEmail } from '../../../utils/apiClient.js';
import { verifyLogin } from '../../../utils/apiClient.js';
import { buildUser } from '../../../utils/userFactory.js';
import { assertAccountResponse, assertBodyResponse } from '../../../utils/apiAssertions.js';

test.describe('create account -> login -> update -> delete -> verify login @api @workflow', () => {

    test('account data stays consistent across account and login endpoints @regression', async ({ request }) => {
        const user = buildUser();

        // 1) Create account
        const createResponse = await createAccount(request, user);
        const createBody = await createResponse.json();
        
        console.log(createBody);
        assertBodyResponse(createBody, 201, 'User created!');

        // 2) Get account info
        const getUser = await getUserDetailByEmail(request, user.email);
        const getResponse = await getUser.json();
        console.log('\nInitial Account Creation:');
        console.log(getResponse);

        assertAccountResponse(getResponse);
        expect(getResponse.responseCode).toBe(200);
        expect(getResponse.user.email).toBe(user.email);
        expect(getResponse.user.first_name).toBe(user.firstname);
        expect(getResponse.user.birth_year).toBe(user.birth_year);

        // 3) Login to new account
        const firstLogin = await verifyLogin(request, { email: user.email, password: user.password });
        const loginBody = await firstLogin.json();
        
        console.log('\nInitial Login:');
        console.log(loginBody);
        assertBodyResponse(loginBody, 200, 'User exists!');

        // 4) Update account
        const updateUser = { ...user, firstname: 'Testisha', birth_year: '1993' };
        const updateResponse = await updateAccount(request, updateUser);
        const updateBody = await updateResponse.json();
        
        console.log('\nUpdate Response:');
        console.log(updateBody);
        assertBodyResponse(updateBody, 200, 'User updated!');

        // 5) Get account info again
        const getUpdatedUser = await getUserDetailByEmail(request, user.email);
        const updatedResponse = await getUpdatedUser.json();
        console.log('\nAfter Update:');
        console.log(updatedResponse);

        assertAccountResponse(updatedResponse);
        expect(updatedResponse.responseCode).toBe(200);
        expect(updatedResponse.user.first_name).toBe('Testisha');
        expect(updatedResponse.user.birth_year).toBe('1993');

        // 6) Delete account
        const deleteUser = await deleteAccount(request, user);
        const deleteResponse = await deleteUser.json();
        
        console.log('\nResponse After Account Deletion:');
        console.log(deleteResponse);
        assertBodyResponse(deleteResponse, 200, 'Account deleted!');

        // 7) Attempt login and verify failure
        const invalidLogin = await verifyLogin(request, { email: user.email, password: user.password });
        const invalidLoginBody = await invalidLogin.json();
        
        console.log('\nVerify Login Failure After Deletion:');
        console.log(invalidLoginBody);
        assertBodyResponse(invalidLoginBody, 404, 'User not found!');
    });
});