# Test Case: API Returns Successful Response

## Test ID
API-001

## Test Title
Verify that the API endpoint returns a successful response with valid data.

## Test Type
API / Functional Test

## Preconditions
- API service is running
- Endpoint is accessible
- Network connection is available

## Test Steps
1. Send a GET request to the API endpoint `/posts`.
2. Observe the response returned by the server.

Example Request:
GET https://jsonplaceholder.typicode.com/posts

## Expected Result
- API returns HTTP status code `200 OK`.
- Response body contains valid JSON data.
- Response data structure matches the expected format (list of posts with id, title, and body fields).

## Actual Result
(To be filled during testing)

## Pass / Fail
(To be filled during testing)

## Severity (if failed)
High

## Notes
If the API returns a status code other than `200`, fails to return valid JSON, or returns malformed data, a defect should be logged.

-------------------

# Test Case: API Returns Error for Invalid Endpoint

## Test ID
API-002

## Test Title
Verify that the API returns an appropriate error when an invalid endpoint is requested.

## Test Type
API / Negative Test

## Preconditions
- API service is running

## Test Steps
1. Send a GET request to an invalid endpoint.

Example Request:
GET https://jsonplaceholder.typicode.com/invalidendpoint

## Expected Result
- API returns HTTP status code `404 Not Found`.
- Response contains an error message indicating the resource does not exist.

## Actual Result
(To be filled during testing)

## Pass / Fail
(To be filled during testing)

## Severity (if failed)
Medium