# API Test Cases: Authentication Endpoints

---

## Test Case: Verify Login with Valid Credentials

### Test ID
API-AUTH-001

### Test Title
Verify that POST /api/verifyLogin returns 200 and confirms user exists with valid credentials

### Test Type
API / Functional Test

### Preconditions
- API service is running and accessible
- A user account exists with the credentials being tested

### Request
POST https://automationexercise.com/api/verifyLogin

### Request Body (form data)
| Field | Value |
|-------|-------|
| email | valid_user@test.com |
| password | validpassword |

### Test Steps
1. Send a POST request to /api/verifyLogin with a valid registered email and password
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and message fields confirm the user exists

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "message": "User exists!"
}
```
- responseCode is 200
- message is "User exists!"

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Critical

---

## Test Case: Verify Login with Missing Credentials

### Test ID
API-AUTH-002

### Test Title
Verify that POST /api/verifyLogin returns 400 when email and password are missing

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible

### Request
POST https://automationexercise.com/api/verifyLogin

### Request Body
(empty — no email or password parameter)

### Test Steps
1. Send a POST request to /api/verifyLogin with no request body
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and message indicate a bad request

### Expected Result
- Response body contains:
```json
{
  "responseCode": 400,
  "message": "Bad request, email or password parameter is missing in POST request."
}
```
- responseCode is 400
- message indicates email or password parameter is missing

### Known Bug
HTTP status code should be 400 per REST conventions but the API returns 200.
Response body responseCode correctly reflects 400.
See defect report: BUG-API-POST-LOGIN-001

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

---

## Test Case: Verify Login with Invalid Credentials

### Test ID
API-AUTH-003

### Test Title
Verify that POST /api/verifyLogin returns 404 when credentials do not match any account

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible
- The email and password used do not match any existing account

### Request
POST https://automationexercise.com/api/verifyLogin

### Request Body (form data)
| Field | Value |
|-------|-------|
| email | wrong_email@test.com |
| password | wrongpassword |

### Test Steps
1. Send a POST request to /api/verifyLogin with an email and password that do not match any account
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and message indicate the user was not found

### Expected Result
- Response body contains:
```json
{
  "responseCode": 404,
  "message": "User not found!"
}
```
- responseCode is 404
- message is "User not found!"

### Known Bug
HTTP status code should be 404 per REST conventions but the API returns 200.
Response body responseCode correctly reflects 404.
See defect report: BUG-API-POST-INVALID-LOGIN-001

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

---

## Test Case: Verify Login with Unsupported Request Method

### Test ID
API-AUTH-004

### Test Title
Verify that DELETE /api/verifyLogin returns 405 for an unsupported request method

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible

### Request
DELETE https://automationexercise.com/api/verifyLogin

### Request Body
(none)

### Test Steps
1. Send a DELETE request to /api/verifyLogin
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and message indicate the request method is not supported

### Expected Result
- Response body contains:
```json
{
  "responseCode": 405,
  "message": "This request method is not supported."
}
```
- responseCode is 405
- message is "This request method is not supported."

### Known Bug
HTTP status code should be 405 per REST conventions but the API returns 200.
Response body responseCode correctly reflects 405.
See defect report: BUG-API-DELETE-LOGIN-001

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

---

## Test Case: Verify Login After Account Deletion

### Test ID
API-AUTH-005

### Test Title
Verify that POST /api/verifyLogin returns 404 after the account has been deleted

### Test Type
API / Integration Test

### Preconditions
- API service is running and accessible
- A user account can be created and deleted via the account endpoints

### Request
POST https://automationexercise.com/api/verifyLogin

### Request Body (form data)
| Field | Value |
|-------|-------|
| email | user_[timestamp]@test.com |
| password | testpassword |

### Test Steps
1. Send POST /api/createAccount to create a new user account
2. Send POST /api/verifyLogin with the new account credentials — verify responseCode 200
3. Send DELETE /api/deleteAccount with the same credentials
4. Send POST /api/verifyLogin again with the same credentials
5. Verify the responseCode and message indicate the user no longer exists

### Expected Result
- Step 2 response body contains:
```json
{
  "responseCode": 200,
  "message": "User exists!"
}
```
- Step 4 response body contains:
```json
{
  "responseCode": 404,
  "message": "User not found!"
}
```
- Login correctly succeeds before deletion and fails after deletion

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Critical

### Notes
This is an integration test verifying that the authentication endpoint correctly
reflects account state after deletion. A failure in step 2 should be investigated
using API-AUTH-001 before assuming the integration itself is broken. A failure in
step 4 may indicate the delete endpoint is not functioning correctly — investigate
using API-ACCOUNT-004 first.

### Cleanup
If the test fails before step 3, send DELETE /api/deleteAccount manually to remove
the test account.