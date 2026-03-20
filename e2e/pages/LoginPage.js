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
        this.signUpError = page.getByRole('paragraph').filter({ hasText: 'already exist'});
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

    async assertSignUpError(message) {
        await expect(this.signUpError).toBeVisible();
        await expect(this.signUpError).toContainText(message);
    }
}