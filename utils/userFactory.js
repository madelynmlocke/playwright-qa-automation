export function buildUser(overrides = {}) {
    const randomEmail = `user_${Date.now()}@test.com`;

    return {
    name: 'Test',
    email: randomEmail,
    password: process.env.PASSWORD_CREATE,
    title: 'Mrs',
    birthDate: '10',
    birthMonth: '10',
    birthYear: '1990',
    firstName: 'Testina',
    lastName: 'McTesterson',
    company: '',
    address1: '456 Testing St',
    address2: '',
    country: 'United States',
    zipCode: '98109',
    state: 'WA',
    city: 'Seattle',
    phoneNumber: '2065559999',
    ...overrides
    };
};