# API Test Cases: Products Endpoints

---

## Test Case: Get All Products

### Test ID
API-PRODUCTS-001

### Test Title
Verify that GET /api/productsList returns a successful response with valid product data

### Test Type
API / Functional Test

### Preconditions
- API service is running and accessible

### Request
GET https://automationexercise.com/api/productsList

### Test Steps
1. Send a GET request to /api/productsList
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and products fields
5. Verify the first product in the list contains all expected fields with correct data types

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
- Each product contains: id (number), name (string), price (string), brand (string), category (object)
- Each category contains: usertype (object), category (string)

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Critical

---

## Test Case: POST to Products List Returns 405

### Test ID
API-PRODUCTS-002

### Test Title
Verify that POST /api/productsList returns 405 for unsupported request method

### Test Type
API / Negative Test

### Preconditions
- API service is running and accessible

### Request
POST https://automationexercise.com/api/productsList

### Test Steps
1. Send a POST request to /api/productsList
2. Observe the HTTP status code
3. Parse the JSON response body
4. Verify the responseCode and message fields indicate an unsupported method

### Expected Result
- Response body contains:
```json
{
  "responseCode": 405,
  "message": "This request method is not supported."
}
```

### Known Bug
HTTP status code should be 405 per REST conventions but the API returns 200.
Response body responseCode correctly reflects 405.
See defect report: BUG-API-POST-PRODUCTSLIST-001

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

---

## Test Case: Search Product with Valid Search Term

### Test ID
API-PRODUCTS-003

### Test Title
Verify that POST /api/searchProduct returns matching products for a valid search term

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
4. Verify the responseCode and products fields
5. Verify at least one returned product name contains the search term

### Expected Result
- HTTP status code is 200
- Response body contains:
```json
{
  "responseCode": 200,
  "products": [...]
}
```
- products is a non-empty array
- At least one product in the results has a name matching or containing the search term

### Known Bug
Searching for generic terms such as "top" returns unrelated products that do not contain
the search term in their name. Specific searches such as "Blue Top" return expected results.
See defect report: BUG-API-POST-SEARCH-001

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

---

## Test Case: Search Product with Missing Parameter

### Test ID
API-PRODUCTS-004

### Test Title
Verify that POST /api/searchProduct returns 400 when search_product parameter is missing

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
See defect report: BUG-API-POST-SEARCH-002

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

---

## Test Case: Product Data Consistency Across Products and Search Endpoints

### Test ID
API-PRODUCTS-005

### Test Title
Verify that product data stays consistent across the products list, brands list, and search endpoints

### Test Type
API / Integration Test

### Preconditions
- API service is running and accessible

### Test Steps
1. Send GET /api/productsList — verify responseCode 200 and products array is non-empty
2. Select the first product from the response and note its id, name, and brand
3. Send GET /api/brandsList — verify responseCode 200 and brands array is non-empty
4. Verify the selected product's brand exists in the brands list
5. Send POST /api/searchProduct with the selected product's name as search_product
6. Verify responseCode 200 and products array is non-empty
7. Verify the original product appears in the search results with matching id, name, and brand

### Expected Result
- All three endpoints return responseCode 200 with non-empty arrays
- The product's brand from /api/productsList exists in /api/brandsList
- Searching by product name via /api/searchProduct returns the same product with
  matching id, name, and brand

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Notes
This is an integration test covering data consistency across catalog, brands, and search
endpoints. A failure in any step should be investigated in isolation using
API-PRODUCTS-001 through API-PRODUCTS-004 and the brands test cases before assuming
the integration itself is broken.