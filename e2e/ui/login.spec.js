import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 

test.describe('Login Validation Tests', () => {
  test('Test Case 2: User can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoHomePage();
    await loginPage.goToLoginPage();
    await loginPage.assertLoginForm();
    await loginPage.login(process.env.EMAIL_VALID, process.env.PASSWORD_VALID); //process.env.EMAIL_VALID, process.env.PASSWORD_VALID
    await loginPage.assertLoggedIn();
    await loginPage.logout();

  });

  test('Test Case 3: login shows error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoHomePage();
    await loginPage.goToLoginPage();
    await loginPage.assertLoginForm();
    await loginPage.login(process.env.EMAIL_VALID, process.env.PASSWORD_INVALID); 
    await loginPage.assertLogInError('incorrect');
  });

  test('Test Case 5: sign up shows error using existing email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.gotoHomePage();
    await loginPage.goToLoginPage();
    await loginPage.assertSignUpForm();
    await loginPage.signUp('Testy', process.env.EMAIL_VALID); 
    await loginPage.assertSignUpError('already exist');

  })

});