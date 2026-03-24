export function buildUser(overrides = {}) {
    const randomEmail = `user_${Date.now()}@test.com`;

    return {
    name: 'Test',
    email: randomEmail,
    password: process.env.PASSWORD_CREATE,
    title: 'Mrs',
    birth_date: '10',
    birth_month: '10',
    birth_year: '1990',
    firstname: 'Testina',
    lastname: 'McTesterson',
    company: '',
    address1: '456 Testing St',
    address2: '',
    country: 'United States',
    zipcode: '98109',
    state: 'WA',
    city: 'Seattle',
    mobile_number: '2065559999',
    ...overrides
    };
};