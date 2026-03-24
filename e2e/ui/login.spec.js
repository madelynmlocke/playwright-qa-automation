import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 
import { buildUser } from '../../utils/userFactory';

test.describe('@ui @login Login Validation Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => { // goes back to homepage before each numbered test is run
    loginPage = new LoginPage(page);
    await loginPage.gotoHomePage();
    await loginPage.goToLoginPage();
  });

  test('Test Case 1: User can register account and delete it', async ({ page }) => {
    const user = buildUser();

    await loginPage.assertSignUpForm();
    await loginPage.signUp(user.name, user.email);
    await loginPage.assertFormHeading();
    await loginPage.fillForm(user);
    await loginPage.assertAccountCreated();
    await page.getByRole('link', { name: 'Continue' }).click();
    await loginPage.assertLoggedIn();
    await loginPage.deleteAccount();
  });

  test('Test Case 2: User can log in with valid credentials', async ({ page }) => {

    await loginPage.assertLoginForm();
    await loginPage.login(process.env.EMAIL_VALID, process.env.PASSWORD_VALID); //process.env.EMAIL_VALID, process.env.PASSWORD_VALID
    await loginPage.assertLoggedIn();
    await loginPage.logout();
  });

  test('Test Case 3: login shows error for invalid credentials', async ({ page }) => {

    await loginPage.assertLoginForm();
    await loginPage.login(process.env.EMAIL_VALID, process.env.PASSWORD_INVALID); 
    await loginPage.assertLogInError('incorrect');
  });

  test('Test Case 5: sign up shows error using existing email', async ({ page }) => {

    await loginPage.assertSignUpForm();
    await loginPage.signUp('Testy', process.env.EMAIL_VALID); 
    await loginPage.assertSignUpError('already exist');
  });

});