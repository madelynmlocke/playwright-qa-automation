# Test Case: Login with Valid Credentials

## Test ID
LOGIN-001

## Test Title
Verify that a user can successfully log in with valid credentials.

## Test Type
Functional / Authentication Test

## Preconditions
- User account exists in the system
- User is on the login page

## Test Steps
1. Navigate to the login page.
2. Enter a valid username or email in the `Username/Email` field.
3. Enter the correct password in the `Password` field.
4. Click the `Login` button.

## Expected Result
- User is successfully authenticated.
- User is redirected to the dashboard or home page.
- User-specific content or navigation options become visible.

## Actual Result
(To be filled during testing)

## Pass / Fail
(To be filled during testing)

## Severity (if failed)
Critical

## Notes
If valid credentials do not allow the user to log in, this should be logged as a critical authentication defect.

-----------------------------------

# Test Case: Login Attempt with Empty Password

## Test ID
LOGIN-002

## Test Title
Verify that the login form prevents authentication when the password field is empty.

## Test Type
Functional / Input Validation Test

## Preconditions
- User is on the login page

## Test Steps
1. Navigate to the login page.
2. Enter a valid username or email in the `Username/Email` field.
3. Leave the `Password` field empty.
4. Click the `Login` button.

## Expected Result
- Login attempt should be blocked.
- A validation message should appear indicating the password field is required.
- User remains on the login page.

## Actual Result
(To be filled during testing)

## Pass / Fail
(To be filled during testing)

## Severity (if failed)
High

## Notes
If the login form allows submission without a password or does not display validation feedback, a validation defect should be reported.