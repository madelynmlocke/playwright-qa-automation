import { test, expect } from '@playwright/test';

test.only('account lifecycle works end to end', async ({ request }) => {
    // create account
    const email = 'testytest@example.com';
    const password = 'test123';
    const createResponse = await request.post('/api/createAccount', {
        form: {
            name: 'tester',
            email,
            password,
            title: 'Mr',
            birth_date: '10',
            birth_month: '10',
            birth_year: '1992',
            firstname: 'Testy',
            lastname: 'Tester',
            address1: '123 Main St',
            country: 'United States',
            zipcode: '98109',
            state: 'WA',
            city: 'Seattle',
            mobile_number: '2065559999'
        }
    });

    const createBody = await createResponse.json();
    console.log(createBody);
    expect(createBody.responseCode).toBe(201);

    // get account info
    const initialUser = await request.get('/api/getUserDetailByEmail', {
        params: { email }
    });

    const initialResponse = await initialUser.json();
    console.log('\n');
    console.log('Initial Account Creation:');
    console.log(initialResponse);

    expect(initialResponse.responseCode).toBe(200);
    expect(initialResponse.user.email).toBe(email);
    expect(initialResponse.user.first_name).toBe('Testy');
    expect(initialResponse.user.birth_year).toBe('1992');

    //login to new account
    const initialLogin = await request.post('/api/verifyLogin', {
        form: {
            email, password
        }
    });
    const loginBody = await initialLogin.json();
    console.log('\n');
    console.log('Initial Login:');
    console.log(loginBody);

    expect(loginBody.responseCode).toBe(200);
    expect(loginBody.message).toBe('User exists!');

    // update account
    const updateResponse = await request.put('/api/updateAccount', {
        form: {
            name: 'tester',
            email,
            password,
            title: 'Mr',
            birth_date: '10',
            birth_month: '10',
            birth_year: '1993', //updated birth year
            firstname: 'Updated',
            lastname: 'Tester',
            address1: '123 Main St',
            country: 'United States',
            zipcode: '98109',
            state: 'WA',
            city: 'Seattle',
            mobile_number: '2065559999'
        }
    });

    const updateBody = await updateResponse.json();
    expect(updateBody.responseCode).toBe(200);

    // get account info again
    const updatedUser = await request.get('/api/getUserDetailByEmail', {
    params: { email }
    });
    const updatedResponse = await updatedUser.json();
    console.log('\n');
    console.log('After update:');
    console.log(updatedResponse);

    expect(updatedResponse.responseCode).toBe(200);
    expect(updatedResponse.user.first_name).toBe('Updated');
    expect(updatedResponse.user.birth_year).toBe('1993');

    // delete account
    const deleteResponse = await request.delete('/api/deleteAccount', {
        form: {
            email, password
        }
    });

    const deletedBody = await deleteResponse.json();
    console.log('\n');
    console.log('Response after account deletion:');
    console.log(deletedBody);

    expect(deletedBody.responseCode).toBe(200);

    //login again, verify failure
        const invalidLogin = await request.post('/api/verifyLogin', {
        form: {
            email, password
        }
    });

    const invalidLoginBody = await invalidLogin.json();
    console.log('\n');
    console.log('Verify invalid Login after account deletion:');
    console.log(invalidLoginBody);

    expect(invalidLoginBody.responseCode).toBe(404);
    expect(invalidLoginBody.message).toBe('User not found!');
});