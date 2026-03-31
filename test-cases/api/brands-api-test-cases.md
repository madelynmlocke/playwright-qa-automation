# API Test Cases: Brands Endpoints

---

## Test Case: Get All Brands

### Test ID
API-BRANDS-001

### Test Title
Verify that GET /api/brandsList returns a successful response with valid brand data

### Test Type
API / Functional Test

### Preconditions
- API service is running and accessible

### Request
GET https://automationexercise.com/api/brandsList

### Test Steps
1. Send a GET request to /api/brandsList
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and brands fields
5. For every brand object in the array verify:
   - id field is present and is a number
   - brand field is present and is a non-empty string

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "brands": [
    {
      "id": 1,
      "brand": "Polo"
    }
  ]
}
```
- brands is a non-empty array
- Each brand contains: id (number), brand (string)

### Actual Result
- HTTP status code is 200
- Response body contains what is expected

### Pass / Fail
Pass

### Severity (if failed)
Critical

### Notes
This test validates the schema of every item in the brands array, not just the first.
If any brand object is missing a required field or contains an unexpected data type,
a defect should be logged.

---

## Test Case: PUT to Brands List Returns 405

### Test ID
API-BRANDS-002

### Test Title
Verify that PUT /api/brandsList returns 405 for an unsupported request method

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible

### Request
PUT https://automationexercise.com/api/brandsList

### Request Body
(none)

### Test Steps
1. Send a PUT request to /api/brandsList
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
See defect report: BUG-API-PUT-BRANDSLIST-001

### Actual Result
- HTTP status code is 200 - Unexpected
- Response body contains what is expected

### Pass / Fail
Fail

### Severity (if failed)
Medium

---

## Test Case: Brand Exists in Products List

### Test ID
API-BRANDS-003

### Test Title
Verify that brands returned by /api/brandsList are consistent with brands referenced in /api/productsList

### Test Type
API / Integration Test

### Preconditions
- API service is running and accessible

### Test Steps
1. Send GET /api/brandsList — verify responseCode 200 and brands array is non-empty
2. Collect all brand name strings from the brands array
3. Send GET /api/productsList — verify responseCode 200 and products array is non-empty
4. For each product in the products array, verify its brand field exists in the brands list collected in step 2

### Expected Result
- Both endpoints return responseCode 200 with non-empty arrays
- Every brand referenced in /api/productsList exists as an entry in /api/brandsList
- No product references a brand that is absent from the official brands list

### Actual Result
- Both endpoints return responseCode 200 with non-empty arrays
- Every brand referenced in /api/productsList exists as an entry in /api/brandsList
- No product references a brand that is absent from the official brands list

### Pass / Fail
Pass

### Severity (if failed)
High

### Notes
This is an integration test verifying data consistency between the brands and products
endpoints. A failure may indicate a product was assigned a brand that was not registered
in the brands list, or that the brands list is incomplete. Investigate each endpoint
individually using API-BRANDS-001 and API-PRODUCTS-001 before assuming the integration
itself is broken.