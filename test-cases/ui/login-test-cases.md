# UI Test Cases: Login Endpoints

## Test Case: User Can Register a New Account and Delete It

### Test ID
UI-LOGIN-001

### Test Title
Verify that a new user can register an account and delete it

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- The email address used does not already exist in the system

### Test Data
| Field | Value |
|-------|-------|
| Name | Test |
| Email | user_[timestamp]@test.com (generated) |
| Password | (from environment) |
| Title | Mrs |
| First Name | Testina |
| Last Name | McTesterson |
| Birth Date | 10 |
| Birth Month | 10 |
| Birth Year | 1990 |
| Address | 456 Testing St |
| Country | United States |
| State | WA |
| City | Seattle |
| Zipcode | 98109 |
| Mobile Number | 2065559999 |

### Test Steps
1. Navigate to the homepage
2. Click the Signup / Login navigation link
3. Verify the "New User Signup!" heading is visible
4. Verify the Name, Email, and Signup button are visible
5. Enter name and a unique email in the signup form
6. Click the Signup button
7. Verify the "Enter Account Information" heading is visible
8. Select title, fill in password, birth date, birth month, birth year
9. Check the newsletter and special offers checkboxes
10. Fill in first name, last name, company, address, country, state, city, zipcode, and mobile number
11. Click the Create Account button
12. Verify "Account Created!" message is visible
13. Click the Continue button
14. Verify "Logged in as" text and logout link are visible
15. Click the Delete Account link
16. Verify "Account Deleted!" message is visible

### Expected Result
- Signup form is visible on the login page
- Account information form loads after initial signup step
- "Account Created!" confirmation is displayed
- User is logged in after clicking Continue
- "Account Deleted!" confirmation is displayed after deletion

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/login.spec.js (`assertSignUpForm()`, `signUp()`, `assertFormHeading()`, `fillForm()`, `assertAccountCreated()`, `assertLoggedIn()`, `deleteAccount()`)

---

## Test Case: User Can Log In with Valid Credentials

### Test ID
UI-LOGIN-002

### Test Title
Verify that a registered user can log in with valid credentials

### Test Type
UI / Smoke Test

### Preconditions
- Application is accessible at https://automationexercise.com
- A valid registered account exists in the system
- User is on the Signup / Login page

### Test Data
| Field | Value |
|-------|-------|
| Email | (valid registered email from environment) |
| Password | (valid password from environment) |

### Test Steps
1. Navigate to the homepage
2. Click the Signup / Login navigation link
3. Verify the page URL contains /login
4. Verify the "Login to your account" heading is visible
5. Verify the email input, password input, and login button are visible
6. Enter a valid email address
7. Enter the correct password
8. Click the Login button
9. Verify "Logged in as" text is visible
10. Verify the logout link is visible
11. Click the logout link

### Expected Result
- Login form is visible at /login
- After submitting valid credentials, "Logged in as" text is visible
- Logout link is visible confirming the user is authenticated
- Clicking logout returns the user to the logged out state

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Critical

### Automation Status
✅ Automated — e2e/ui/login.spec.js (`assertLoginForm()`, `login()`, `assertLoggedIn()`, `logout()`)

---

## Test Case: Login Shows Error for Invalid Credentials

### Test ID
UI-LOGIN-003

### Test Title
Verify that the login form shows an error message when invalid credentials are entered

### Test Type
UI / Negative Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Signup / Login page

### Test Data
| Field | Value |
|-------|-------|
| Email | (valid registered email from environment) |
| Password | (invalid password from environment) |

### Test Steps
1. Navigate to the homepage
2. Click the Signup / Login navigation link
3. Verify the login form is visible
4. Enter a valid email address
5. Enter an incorrect password
6. Click the Login button
7. Observe the result

### Expected Result
- Login does not succeed
- Error message containing "incorrect" is visible on the page
- User remains on the login page

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/login.spec.js (`assertLoginForm()`, `login()`, `assertLogInError()`)

---

## Test Case: Login Attempt with Empty Password

### Test ID
UI-LOGIN-004

### Test Title
Verify that the login form prevents submission when the password field is empty

### Test Type
UI / Negative Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Signup / Login page

### Test Data
| Field | Value |
|-------|-------|
| Email | (valid registered email) |
| Password | (empty) |

### Test Steps
1. Navigate to the homepage
2. Click the Signup / Login navigation link
3. Verify the login form is visible
4. Enter a valid email address
5. Leave the password field empty
6. Click the Login button
7. Observe the result

### Expected Result
- Login does not succeed
- Validation feedback is displayed indicating the password field is required
- User remains on the login page

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
❌ Not Automated

---

## Test Case: Sign Up Shows Error When Using an Existing Email

### Test ID
UI-LOGIN-005

### Test Title
Verify that the sign up form shows an error when registering with an already existing email

### Test Type
UI / Negative Test

### Preconditions
- Application is accessible at https://automationexercise.com
- An account already exists for the email being used
- User is on the Signup / Login page

### Test Data
| Field | Value |
|-------|-------|
| Name | Testy |
| Email | (valid registered email that already exists in the system) |

### Test Steps
1. Navigate to the homepage
2. Click the Signup / Login navigation link
3. Verify the "New User Signup!" heading is visible
4. Enter a name in the Name field
5. Enter an email address that already exists in the system
6. Click the Signup button
7. Observe the result

### Expected Result
- Signup does not proceed to the account information form
- Error message containing "already exist" is visible on the page
- User remains on the login page

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

### Automation Status
✅ Automated — e2e/ui/login.spec.js (`assertSignUpForm()`, `signUp()`, `assertSignUpError()`)

---

## Test Case: User Can Log Out Successfully

### Test ID
UI-LOGIN-006

### Test Title
Verify that a logged in user can log out successfully

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is logged in to a valid account

### Test Steps
1. Log in with valid credentials
2. Verify "Logged in as" text is visible
3. Click the logout link in the navigation bar
4. Observe the result

### Expected Result
- User is logged out successfully
- User is redirected to the login page
- "Logged in as" text is no longer visible
- Logout link is no longer visible

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
❌ Not Automated