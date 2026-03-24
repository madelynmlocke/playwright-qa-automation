import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 

test.describe('Login Validation Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => { // goes back to homepage before each numbered test is run
    loginPage = new LoginPage(page);
    await loginPage.gotoHomePage();
    await loginPage.goToLoginPage();
  });

  test.only('test', async ({ page }) => {
    await page.getByRole('heading', { name: 'New User Signup!' }).click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Testo');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('testomctester@gmail.com');
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).click();
    await page.getByRole('textbox', { name: 'Password *' }).fill('test123');
    await page.locator('#days').selectOption('8');
    await page.locator('#months').selectOption('7');
    await page.locator('#years').selectOption('1980');
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await page.getByRole('textbox', { name: 'First name *' }).click();
    await page.getByRole('textbox', { name: 'First name *' }).fill('testo');
    await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('mctester');
    await page.getByRole('textbox', { name: 'Company', exact: true }).click();
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('testing corp');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('678 testing st');
    await page.getByRole('textbox', { name: 'Address 2' }).click();
    await page.getByRole('textbox', { name: 'Address 2' }).fill('unit a');
    await page.getByLabel('Country *').selectOption('United States');
    await page.getByRole('textbox', { name: 'State *' }).click();
    await page.getByRole('textbox', { name: 'State *' }).fill('WA');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Seattle');
    await page.locator('#zipcode').click();
    await page.locator('#zipcode').fill('98109');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('2068889944');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page.getByText('Logged in as Testo')).toBeVisible();
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await expect(page.getByText('Account Deleted!')).toBeVisible();

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

  })

});