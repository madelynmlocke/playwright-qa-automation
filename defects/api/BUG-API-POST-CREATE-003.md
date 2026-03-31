# Bug Report: POST /createAccount successfully creates account when password field is empty
---

## BUG ID
BUG-API-POST-CREATE-003

## Summary
Sending a POST request to /api/createAccount with an empty password field does not return a validation error. Instead, the API creates the account successfully and returns a 201 response code. The API is not enforcing required field validation on the password field.

---

## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4

---

## Steps to Reproduce
1. Send a POST request to /api/createAccount
2. Include all required fields except set password to an empty string `""`
3. Observe HTTP response

---

## Expected Result
API should validate that the password field is present and non-empty before creating an account.
Response body should indicate that the password field is missing or invalid:
```
{
  "responseCode": 400,
  "message": "Bad request, email or password is missing!"
}
```

---

## Actual Result
- API skips password validation and creates the account successfully:
```
{
  "responseCode": 201,
  "message": "User created!"
}
```
- HTTP Status code returns 200, instead of expected 4XX.
---

## Severity
High

---

## Root Cause
The API does not validate required fields before executing account creation logic. An empty password string passes through validation and results in an account being created without a password, which is a security risk.

---

## Parent Bug
BUG-API-GLOBAL-001 - API does not return correct HTTP status codes globally

---

## Status
Open