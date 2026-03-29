# Bug Report: POST /createAccount returns HTTP 200 instead of expected 201
---

## BUG ID
BUG-API-POST-CREATE-001

## Summary
Sending a POST request to /api/createAccount is returning an incorrect HTTP response of 200 instead of 201. 
Response body in JSON displays a responseCode and message. 

---

## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4

---

## Steps to Reproduce:
1. Send a POST request to /api/createAccount
2. Observe HTTP response

---

## Expected Result
HTTP status code should be 201 User created
Response body should indicate User has been created

---

## Actual Result
HTTP status code is 200 OK
Response body contains:
```
{
  "responseCode": 201,
  "message": "User created!"
}
```
---

## Severity
Medium

---

## Root Cause
The API appears to use a custom JSON responseCode field for error reporting, 
but does not set the corresponding HTTP status code on the server response. 
As a result, unsupported methods return 200 OK at the protocol level instead of 
201 Method Not Allowed.

---

## Status: 
Open