export function buildUser(overrides = {}) {
    //const randomEmail = `user_${Date.now()}@test.com`;

    return {
    name: 'Test',
    email: process.env.EMAIL_VALID,
    password: process.env.PASSWORD_VALID,
    title: 'Mr',
    birth_date: '10',
    birth_month: '10',
    birth_year: '1990',
    firstname: 'Testy',
    lastname: 'McTester',
    company: '',
    address1: '123 Testing St',
    address2: '',
    country: 'United States',
    zipcode: '98109',
    state: 'WA',
    city: 'Seattle',
    mobile_number: '2065559999',
    ...overrides
    };
};