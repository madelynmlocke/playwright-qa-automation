import { test, expect } from '../../fixtures/index.js';

test.describe('@ui @login Login Validation Tests', () => {

    // registration test still needs freshUser since it goes through the full sign up flow
    test('Test Case 1: User can register account and delete it @smoke', async ({ freshUser, loginPage, page }) => {
        await loginPage.gotoHomePage();
        await loginPage.goToLoginPage();
        await loginPage.assertSignUpForm();
        await loginPage.signUp(freshUser.name, freshUser.email);
        await loginPage.assertFormHeading();
        await loginPage.fillForm(freshUser);
        await loginPage.assertAccountCreated();
        await page.getByRole('link', { name: 'Continue' }).click();
        await loginPage.assertLoggedIn();
        await loginPage.deleteAccount();
    });

    // tests that just need to start at the login page
    test('Test Case 2: User can log in with valid credentials @smoke', async ({ loggedOutUser }) => {
        await loggedOutUser.assertLoginForm();
        await loggedOutUser.login(process.env.EMAIL_VALID, process.env.PASSWORD_VALID);
        await loggedOutUser.assertLoggedIn();
        await loggedOutUser.logout();
    });

    test('Test Case 3: login shows error for invalid credentials @negative', async ({ loggedOutUser }) => {
        await loggedOutUser.assertLoginForm();
        await loggedOutUser.login(process.env.EMAIL_VALID, process.env.PASSWORD_INVALID);
        await loggedOutUser.assertLogInError('incorrect');
    });

    test('Test Case 5: sign up shows error using existing email @negative', async ({ loggedOutUser }) => {
        await loggedOutUser.assertSignUpForm();
        await loggedOutUser.signUp('Testy', process.env.EMAIL_VALID);
        await loggedOutUser.assertSignUpError('already exist');
    });
});