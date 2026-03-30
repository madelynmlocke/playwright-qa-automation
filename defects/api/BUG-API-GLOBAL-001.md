# Bug Report: API globally returns HTTP 200 instead of correct HTTP status codes
---
 
## BUG ID
BUG-API-GLOBAL-001
 
## Summary
All API endpoints on automationexercise.com return HTTP 200 at the protocol level regardless of the outcome of the request. The API uses a custom `responseCode` field inside the JSON response body to communicate the actual result. This is a systemic issue affecting all endpoints and all HTTP methods tested.
 
---
 
## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4
 
---
 
## Affected Endpoints
 
| Bug ID | Endpoint | Method | Expected Status | Actual Status |
|--------|----------|--------|-----------------|---------------|
| BUG-API-POST-CREATE-001 | /api/createAccount | POST | 201 Created | 200 OK |
| BUG-API-DELETE-LOGIN-001 | /api/verifyLogin | DELETE | 405 Method Not Allowed | 200 OK |
| BUG-API-POST-INVALID-LOGIN-001 | /api/verifyLogin | POST | 404 Not Found | 200 OK |
| BUG-API-POST-LOGIN-001 | /api/verifyLogin | POST | 400 Bad Request | 200 OK |
| BUG-API-POST-PRODUCTSLIST-001 | /api/productsList | POST | 405 Method Not Allowed | 200 OK |
| BUG-API-POST-SEARCH-002 | /api/searchProduct | PUT | 400 Method Not Allowed | 200 OK |
| BUG-API-PUT-BRANDSLIST-001 | /api/brandsList | PUT | 405 Method Not Allowed | 200 OK |

 
---
 
## Steps to Reproduce
1. Send any request to any API endpoint
2. Observe the HTTP response status code
3. Compare against the responseCode value in the JSON response body
 
---
 
## Expected Result
Each endpoint should return the appropriate HTTP status code at the protocol level that reflects the outcome of the request — for example, 201 for resource creation, 400 for bad requests, 404 for not found, and 405 for unsupported methods.
 
---
 
## Actual Result
All endpoints return HTTP 200 OK at the protocol level regardless of outcome. The actual status is buried inside the JSON response body:
```
{
  "responseCode": 404,
  "message": "User not found!"
}
```
 
---
 
## Severity
High
 
---
 
## Root Cause
The API is not using HTTP status codes as intended by the HTTP specification. Instead, it implements a custom response envelope pattern using a `responseCode` field in the JSON body. This means any HTTP client or monitoring tool relying on standard status codes for error detection will incorrectly treat all responses as successful.
 
---
 
## Impact
- Clients and integrations relying on HTTP status codes will fail to detect errors
- Automated test assertions on `response.status()` are unreliable across the entire API
- Load balancers, API gateways, and monitoring tools will report false success rates
 
---
 
## Workaround
Assert on `responseCode` in the JSON response body instead of the HTTP status code. All automated tests in this project have been updated accordingly with inline comments referencing this bug.
 
---
 
## Status
Open
 