# API Test Cases: Account Endpoints

---

## Test Case: Create Account with Valid Data

### Test ID
API-ACCOUNT-001

### Test Title
Verify that POST /api/createAccount successfully creates a new user account

### Test Type
API / Functional / Acceptance / Smoke Test

### Preconditions
- API service is running and accessible
- Test email does not already exist in the system

### Request
POST https://automationexercise.com/api/createAccount

### Request Body (form data)
| Field | Value |
|-------|-------|
| name | Test |
| email | user_[timestamp]@test.com |
| password | testpassword |
| title | Mrs |
| birth_date | 10 |
| birth_month | 10 |
| birth_year | 1990 |
| firstname | Testina |
| lastname | McTesterson |
| address1 | 456 Testing St |
| country | United States |
| zipcode | 98109 |
| state | WA |
| city | Seattle |
| mobile_number | 2065559999 |

### Test Steps
1. Send a POST request to /api/createAccount with all required fields in the request body
2. Observe the HTTP status code returned
3. Parse the JSON response body
4. Verify the responseCode and message fields

### Expected Result
- HTTP status code is 201
- Response body contains:
```json
{
  "responseCode": 201,
  "message": "User created!"
}
```

### Known Bug
HTTP status code should be 201 per REST conventions but the API returns 200.
Response body responseCode correctly reflects 201.
See defect report: BUG-API-POST-CREATE-001

### Actual Result
- HTTP status code is 200 - not expected
- Response body contains what is expected 


### Pass / Fail
Fail

### Severity (if failed)
Critical

### Cleanup
Send DELETE request to /api/deleteAccount using the same email and password to remove the test account.

---

## Test Case: Get User Details by Email

### Test ID
API-ACCOUNT-002

### Test Title
Verify that GET /api/getUserDetailByEmail returns correct account details for a registered user

### Test Type
API / Functional / Acceptance / Smoke Test

### Preconditions
- API service is running and accessible
- A user account exists with a known email address

### Request
GET https://automationexercise.com/api/getUserDetailByEmail?email=user_[timestamp]@test.com

### Test Steps
1. Create a user account via POST /api/createAccount
2. Send a GET request to /api/getUserDetailByEmail with the registered email as a query parameter
3. Observe the HTTP status code
4. Parse the JSON response body
5. Verify the responseCode, user object, and user field values match what was submitted during registration

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "user": {
    "id": 123,
    "name": "Test",
    "email": "user_[timestamp]@test.com",
    "title": "Mrs",
    "birth_day": "10",
    "birth_month": "10",
    "birth_year": "1990",
    "first_name": "Testina",
    "last_name": "McTesterson",
    "company": "",
    "address1": "456 Testing St",
    "address2": "",
    "country": "United States",
    "zipcode": "98109",
    "state": "WA",
    "city": "Seattle",
    "mobile_number": "2065559999"
  }
}
```
- user.email matches the email used during account creation
- user.first_name matches the firstname submitted during registration

### Actual Result
- HTTP status code is 200 - Expected
- Response body contains what is expected 

### Pass / Fail
Pass

### Severity (if failed)
High

### Cleanup
Send DELETE request to /api/deleteAccount to remove the test account.

---

## Test Case: Update Account with Valid Data

### Test ID
API-ACCOUNT-003

### Test Title
Verify that PUT /api/updateAccount successfully updates an existing user account

### Test Type
API / Functional Test

### Preconditions
- API service is running and accessible
- A user account exists with a known email and password

### Request
PUT https://automationexercise.com/api/updateAccount

### Request Body (form data)
Same fields as createAccount, with one or more values changed. Example:
| Field | Original Value | Updated Value |
|-------|---------------|---------------|
| firstname | Testina | Updated |
| birth_year | 1990 | 1993 |

### Test Steps
1. Create a user account via POST /api/createAccount
2. Send a PUT request to /api/updateAccount with the same email and password, and at least one changed field
3. Observe the HTTP status code
4. Parse the JSON response body
5. Send a GET request to /api/getUserDetailByEmail to verify the changes were saved
6. Confirm the updated fields reflect the new values

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "message": "User updated!"
}
```
- Subsequent GET /api/getUserDetailByEmail returns the updated field values

### Actual Result
- HTTP status code is 200 - Expected
- Response body contains what is expected 

### Pass / Fail
Pass

### Severity (if failed)
High

### Cleanup
Send DELETE request to /api/deleteAccount to remove the test account.

---

## Test Case: Delete Account

### Test ID
API-ACCOUNT-004

### Test Title
Verify that DELETE /api/deleteAccount successfully removes a user account

### Test Type
API / Functional Test

### Preconditions
- API service is running and accessible
- A user account exists with a known email and password

### Request
DELETE https://automationexercise.com/api/deleteAccount

### Request Body (form data)
| Field | Value |
|-------|-------|
| email | user_[timestamp]@test.com |
| password | testpassword |

### Test Steps
1. Create a user account via POST /api/createAccount
2. Send a DELETE request to /api/deleteAccount with the registered email and password
3. Observe the HTTP status code
4. Parse the JSON response body
5. Verify the responseCode and message fields
6. Send a POST request to /api/verifyLogin with the deleted account's credentials to confirm the account no longer exists

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "message": "Account deleted!"
}
```
- Subsequent POST /api/verifyLogin returns responseCode 404 and message "User not found!"

### Actual Result
- HTTP status code is 200 - Expected
- Response body contains what is expected 

### Pass / Fail
Pass

### Severity (if failed)
Critical

---

## Test Case: Account Data Consistency Across Endpoints

### Test ID
API-ACCOUNT-005

### Test Title
Verify that account data stays consistent across create, login, update, and delete endpoints

### Test Type
API / Integration Test

### Preconditions
- API service is running and accessible
- Test email does not already exist in the system

### Test Steps
1. Send POST /api/createAccount with full user data — verify responseCode 201
2. Send GET /api/getUserDetailByEmail — verify email, first_name, and birth_year match registration data
3. Send POST /api/verifyLogin with the new account credentials — verify responseCode 200 and message "User exists!"
4. Send PUT /api/updateAccount with updated firstname and birth_year — verify responseCode 200
5. Send GET /api/getUserDetailByEmail again — verify first_name and birth_year reflect the updates
6. Send DELETE /api/deleteAccount — verify responseCode 200 and message "Account deleted!"
7. Send POST /api/verifyLogin again — verify responseCode 404 and message "User not found!"

### Expected Result
- All seven steps return the expected response codes and messages
- GET responses reflect the correct state of the account at each point in the workflow
- Login correctly succeeds before deletion and fails after deletion

### Actual Result
- All seven steps return the expected response codes and messages
- GET responses reflect the correct state of the account at each point in the workflow
- Login correctly succeeds before deletion and fails after deletion

### Pass / Fail
Passed

### Severity (if failed)
Critical

### Notes
This is an integration test covering the full account lifecycle. A failure in any step should be
investigated in isolation using the individual test cases API-ACCOUNT-001 through API-ACCOUNT-004
before assuming the integration itself is broken.