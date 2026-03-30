# Bug Report: POST /createAccount returns 'Email already exists!' for empty email field
---
 
## BUG ID
BUG-API-POST-CREATE-002
 
## Summary
Sending a POST request to /api/createAccount with an empty email field returns a misleading `Email already exists!` error instead of a bad request or missing field error. The API is running a duplicate check against an empty string rather than validating that required fields are present first.
 
---
 
## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4
 
---
 
## Steps to Reproduce:
1. Send a POST request to /api/createAccount
2. Include all required fields except set email to an empty string `""`
3. Observe HTTP response
 
---
 
## Expected Result
API should validate required fields before running any business logic.
Response body should indicate that the email field is missing or invalid:
```
{
  "responseCode": 400,
  "message": "Bad request, email or password is missing!"
}
```
 
---
 
## Actual Result
It suggests that the API skips input validation and runs a duplicate email check against the empty string.
Response body returns:
```
{
  "responseCode": 400,
  "message": "Email already exists!"
}
```
 
---
 
## Severity
Medium
 
---
 
## Root Cause
The API is not performing required field validation before executing business logic. An empty email string is being passed directly to a duplicate check query, which produces a misleading and incorrect error message. Input validation should occur prior to any database or business logic operations.
 
---
 
## Status
Open