import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        //Update these selectors to match the real site
        this.signupLoginLink = page.getByRole('link', { name: /signup \/ login/i }); //navigation link to sign up / login page
        this.logOutLink = page.locator('a[href="/logout"]'); // link to logout 

        this.loginHeading = page.getByRole('heading', { name: /login to your account/i });  // login form heading
        this.emailInput = page.locator('input[data-qa="login-email"]'); // email input
        this.passwordInput = page.locator('input[data-qa="login-password"]'); // password input
        this.loginButton = page.locator('button[data-qa="login-button"]'); // button
        
        this.loggedInText = page.getByText(/logged in as/i); // displays which account logged in as
        this.errorMessage = page.locator('.login-form p').filter({ hasText: 'incorrect' });

        this.signupHeading = page.getByRole('heading', { name: /new user signup!/i });
        this.signupName = page.locator('input[data-qa="signup-name"]');
        this.signupEmail = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.signUpError = page.locator('p', { hasText: /already exist/i });
    }

    async gotoHomePage() {
        await this.page.goto('/');
    }

    async goToLoginPage() {
        await expect(this.signupLoginLink).toBeVisible();
        await this.signupLoginLink.click();
    }

    async assertLoginForm() { // verifies login form visibility
        await expect(this.page).toHaveURL(/\/login$/);
        await expect(this.loginHeading).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(email, password) { // fills login form
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoggedIn() { // verifies logged in as visibility
        await expect(this.loggedInText).toBeVisible();
        await expect(this.logOutLink).toBeVisible();
    }

    async logout() {
        await this.logOutLink.click();
    }
    
    async assertLogInError(message) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(message);
    }

    async assertSignUpForm() {
        await expect(this.signupHeading).toBeVisible();
        await expect(this.signupName).toBeVisible();
        await expect(this.signupEmail).toBeVisible();
        await expect(this.signupButton).toBeVisible();
    }

    async signUp(name, email) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async assertFormHeading() {
        await expect(this.page.getByText('Enter Account Information')).toBeVisible();
    }

    async fillForm() {
        await this.page.getByRole('radio', { name: 'Mr.' }).check();
        await this.page.getByRole('textbox', { name: 'Password *' }).fill(process.env.PASSWORD_VALID);
        await this.page.locator('#days').selectOption('8');
        await this.page.locator('#months').selectOption('7');
        await this.page.locator('#years').selectOption('1980');
        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
        await this.page.getByRole('textbox', { name: 'First name *' }).fill('testo');
        await this.page.getByRole('textbox', { name: 'Last name *' }).fill('mctester');
        await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill('testing corp');
        await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('678 testing st');
        await this.page.getByRole('textbox', { name: 'Address 2' }).fill('unit a');
        await this.page.getByLabel('Country *').selectOption('United States');
        await this.page.getByRole('textbox', { name: 'State *' }).fill('WA');
        await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Seattle');
        await this.page.locator('#zipcode').fill('98109');
        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill('2068889944');
        await this.page.getByRole('button', { name: 'Create Account' }).click();
    }

    async assertAccountCreated() {
        await expect(this.page.getByText('Account Created!')).toBeVisible();
    }

    async assertSignUpError(message) {
        await expect(this.signUpError).toBeVisible();
        await expect(this.signUpError).toContainText(message);
    }

    async deleteAccount() {
            await this.page.getByRole('link', { name: ' Delete Account' }).click();
            await expect(this.page.getByText('Account Deleted!')).toBeVisible();
    }
}