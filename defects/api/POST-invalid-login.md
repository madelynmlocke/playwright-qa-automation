# Bug Report: POST /verifyLogin returns HTTP 200 instead of expected 404
---

## Summary
Sending a POST request to /api/verifyLogin is returning an incorrect HTTP response of 200 instead of 404. 
Response body in JSON displays a responseCode and message. 

---

## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4

---

## Steps to Reproduce:
1. Send a POST request to /api/verifyLogin
2. Observe HTTP response

---

## Expected Result
HTTP status code should be 404 User not found
Response body should indicate user is not found

---

## Actual Result
HTTP status code is 200 OK
Response body contains:
```
{
  "responseCode": 404,
  "message": "User not found!"
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
404 User not found.

---

## Status: 
Open