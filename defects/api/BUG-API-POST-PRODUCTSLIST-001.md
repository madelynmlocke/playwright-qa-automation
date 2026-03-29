# Bug Report: POST /productsList returns HTTP 200 instead of expected 405
---

## Bug ID
BUG-API-POST-PRODUCTSLIST-001

## Summary
Sending a POST request to /api/productsList is returning an incorrect HTTP response of 200 instead of 405. 
Response body in JSON displays a responseCode and message. 

---

## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4

---

## Steps to Reproduce:
1. Send a POST request to /api/productsList
2. Observe HTTP response

---

## Expected Result
HTTP status code should be 405 Method Not Allowed
Response body should indicate method is not supported

---

## Actual Result
HTTP status code is 200 OK
Response body contains:
```
{
  "responseCode": 405,
  "message": "This request method is not supported."
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
405 Method Not Allowed.

---

## Status: 
Open