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
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

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

## Test Case: Search Product with Generic Search Term Returns Unrelated Results

### Test ID
API-SEARCH-003

### Test Title
Verify search behavior when a broad or generic search term is used

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible

### Request
POST https://automationexercise.com/api/searchProduct

### Request Body (form data)
| Field | Value |
|-------|-------|
| search_product | top |

### Test Steps
1. Send a POST request to /api/searchProduct with search_product set to "top"
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode is 200 and products array is non-empty
5. Review returned product names and check whether all results contain the search term
6. Note any products returned that do not contain "top" in their name

### Expected Result
- HTTP status code is 200
- Response body contains responseCode 200 and a non-empty products array
- All returned products should have names containing the search term "top"

### Actual Result
API returns products whose names do not contain "top", including unrelated items.
Not all results are relevant to the search term.

### Pass / Fail
Fail

### Severity (if failed)
Medium

### Notes
This test case documents a known defect in the search filtering behavior.
See defect report: BUG-API-POST-SEARCH-TOP-001

---

## Test Case: Search Product with Partial Search Term

### Test ID
API-SEARCH-004

### Test Title
Verify that POST /api/searchProduct returns results for a partial product name

### Test Type
API / Functional Test

### Preconditions
- API service is running and accessible
- At least one product exists whose name contains the partial term

### Request
POST https://automationexercise.com/api/searchProduct

### Request Body (form data)
| Field | Value |
|-------|-------|
| search_product | Blue |

### Test Steps
1. Send a POST request to /api/searchProduct with search_product set to "Blue"
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode is 200 and products array is non-empty
5. Verify at least one returned product name contains "Blue"

### Expected Result
- HTTP status code is 200
- Response body contains responseCode 200 and a non-empty products array
- At least one returned product name contains the partial term "Blue"

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

### Notes
Tests whether the search endpoint supports partial string matching. If no results
are returned for a valid partial term, a defect should be logged.

---

## Test Case: Search Product with No Matching Results

### Test ID
API-SEARCH-005

### Test Title
Verify that POST /api/searchProduct returns an empty products array when no results match

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible
- The search term used does not match any existing product name

### Request
POST https://automationexercise.com/api/searchProduct

### Request Body (form data)
| Field | Value |
|-------|-------|
| search_product | xyznonexistentproduct |

### Test Steps
1. Send a POST request to /api/searchProduct with a search term known not to match any product
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode field
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
- products is an empty array

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Low

### Notes
If the API returns a non-empty products array for a term that should match nothing,
or returns an error instead of an empty array, a defect should be logged.