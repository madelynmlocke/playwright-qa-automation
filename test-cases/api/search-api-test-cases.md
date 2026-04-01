# API Test Cases: Search Endpoints

---

## Test Case: Search Product with Valid Search Term

### Test ID
API-SEARCH-001

### Test Title
Verify that POST /api/searchProduct returns matching results for a valid search term

### Test Type
API / Functional Test

### Preconditions
- API service is running and accessible
- At least one product exists in the system matching the search term

### Request
POST https://automationexercise.com/api/searchProduct

### Request Body (form data)
| Field | Value |
|-------|-------|
| search_product | Blue Top |

### Test Steps
1. Send a POST request to /api/searchProduct with search_product set to "Blue Top"
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode field is 200
5. Verify the products field is a non-empty array
6. Verify at least one returned product name contains the search term

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "products": [
    {
      "id": 1,
      "name": "Blue Top",
      "price": "Rs. 500",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    }
  ]
}
```
- products is a non-empty array
- At least one product name matches or contains "Blue Top"

### Actual Result
- HTTP status code is 200
- Response body contains what is expected

### Pass / Fail
Pass

### Severity (if failed)
High

---

## Test Case: Search Product with Missing Parameter

### Test ID
API-SEARCH-002

### Test Title
Verify that POST /api/searchProduct returns 400 when the search_product parameter is missing

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible

### Request
POST https://automationexercise.com/api/searchProduct

### Request Body
(empty — no search_product parameter)

### Test Steps
1. Send a POST request to /api/searchProduct with no request body
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and message indicate a bad request

### Expected Result
- Response body contains:
```json
{
  "responseCode": 400,
  "message": "Bad request, search_product parameter is missing in POST request."
}
```

### Known Bug
HTTP status code should be 400 per REST conventions but the API returns 200.
Response body responseCode correctly reflects 400.
See defect report: BUG-API-POST-SEARCH-001

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

---

## Test Case: Search Product with No Matching Results

### Test ID
API-SEARCH-003

### Test Title
Verify that POST /api/searchProduct returns an empty products array for a non-existent search term

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible
- The search term used does not match any product in the system

### Request
POST https://automationexercise.com/api/searchProduct

### Request Body (form data)
| Field | Value |
|-------|-------|
| search_product | nonexistent |

### Test Steps
1. Send a POST request to /api/searchProduct with search_product set to "nonexistent"
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the products field is present
5. Verify the products array is empty

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "products": []
}
```
- products is an empty array with length of 0

### Actual Result
- HTTP status code is 200
- Response body returned:
```json
{
  "responseCode": 200,
  "products": []
}
```
- products array was empty as expected

### Pass / Fail
Pass

### Severity (if failed)
Medium

### Automation Status
Automated — API-SEARCH-007 in search.api.spec.js

---

## Test Case: Search Product with Single Character Search Term

### Test ID
API-SEARCH-004

### Test Title
Verify that POST /api/searchProduct returns results for a single character search term

### Test Type
API / Boundary Test

### Preconditions
- API service is running and accessible
- At least one product exists in the system with the character 't' in its name

### Request
POST https://automationexercise.com/api/searchProduct

### Request Body (form data)
| Field | Value |
|-------|-------|
| search_product | t |

### Test Steps
1. Send a POST request to /api/searchProduct with search_product set to "t"
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the products field is present
5. Verify the products array contains at least one result

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "products": [...]
}
```
- products is a non-empty array with at least one result
- Returned products contain the character 't' in their name

### Actual Result
- HTTP status code is 200
- Response body returned a non-empty products array
- All returned products contained the character 't' in their name

### Pass / Fail
Pass

### Severity (if failed)
Low

### Automation Status
Automated — API-SEARCH-008 in search.api.spec.js