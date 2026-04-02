import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        // navigation link to sign up / login page
        this.signupLoginLink = page.getByRole('link', { name: /signup \/ login/i }); 

        // login form selectors
        this.loginHeading = page.getByRole('heading', { name: /login to your account/i });
        this.emailInput = page.locator('input[data-qa="login-email"]'); 
        this.passwordInput = page.locator('input[data-qa="login-password"]'); 
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.errorMessage = page.locator('.login-form p').filter({ hasText: 'incorrect' });

        // logged in assertion
        this.loggedInText = page.getByText(/logged in as/i); // displays which account logged in as
        this.logOutLink = page.locator('a[href="/logout"]'); // link to logout 
        this.logInError = page.locator('input[data-qa="password"]');

        // initial sign up selectors
        this.signupHeading = page.getByRole('heading', { name: /new user signup!/i });
        this.signupName = page.locator('input[data-qa="signup-name"]');
        this.signupEmail = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.signUpError = page.locator('p', { hasText: /already exist/i });
        this.continueLink = page.getByRole('link', { name: 'Continue' });

        // Sign Up Form Selectors
        this.regPasswordInput = page.getByRole('textbox', { name: 'Password *' });
        this.birthDay = page.locator('#days');
        this.birthMonth = page.locator('#months');
        this.birthYear = page.locator('#years');
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.company = page.getByRole('textbox', { name: 'Company', exact: true });
        this.address1 = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.address2 = page.getByRole('textbox', { name: 'Address 2' });
        this.city = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.state = page.getByRole('textbox', { name: 'State *' });
        this.country = page.getByLabel('Country *');
        this.zipCode = page.locator('#zipcode');
        this.newsLetter = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.specialOffers = page.getByRole('checkbox', { name: 'Receive special offers from' });
        this.phoneNumber = page.getByRole('textbox', { name: 'Mobile Number *' });

        this.createAccountBtn = page.getByRole('button', { name: 'Create Account' });
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

    async assertLoginError() {
        await expect(this.page).toHaveURL(/\/login$/);
        await expect(this.passwordInput).toHaveAttribute('required', '');
    }

    async logout() {
        await this.logOutLink.click();
        //await expect(this.page).toHaveURL('/');
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

    async fillForm(user) {
        await this.page.getByRole('radio', { name: 'Mr.' }).check();
        await this.regPasswordInput.fill(user.password);
        await this.birthDay.selectOption(user.birth_date);
        await this.birthMonth.selectOption(user.birth_month);
        await this.birthYear.selectOption(user.birth_year);
        await this.newsLetter.check();
        await this.specialOffers.check();
        await this.firstName.fill(user.firstname);
        await this.lastName.fill(user.lastname);
        await this.company.fill(user.company);
        await this.address1.fill(user.address1);
        await this.address2.fill(user.address2);
        await this.country.selectOption(user.country);
        await this.state.fill(user.state);
        await this.city.fill(user.city);
        await this.zipCode.fill(user.zipcode);
        await this.phoneNumber.fill(user.mobile_number);
        await this.createAccountBtn.click();
    }

    async assertAccountCreated() {
        await expect(this.page.getByText('Account Created!')).toBeVisible();
    }

    async assertSignUpError(message) {
        await expect(this.signUpError).toBeVisible();
        await expect(this.signUpError).toContainText(message);
    }

    async deleteAccount() {
            await this.page.getByRole('link', { name: ' Delete Account' }).click();
            await expect(this.page.getByText('Account Deleted!')).toBeVisible();
    }
}