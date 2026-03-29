# Bug Report: POST /searchProduct returns unrelated products for search term
---

## Bug ID
BUG-API-POST-SEARCH-001

## Summary
Sending a POST request with `search_product: 'top'` to `/api/searchProduct` returns products
that do not contain the search term in their name, indicating the endpoint is not filtering
results correctly.

---

## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4

---

## Steps to Reproduce:
1. Send a POST request to `/api/searchProduct` with form parameter `search_product: 'top'`
2. Observe the returned products array in the response body

---

## Expected Result
All products returned should contain the search term "top" in their name.  
Example of expected product: `{ id: 1, name: 'Blue Top', ... }`

---

## Actual Result
Response returns products unrelated to the search term "top".  
Example of unexpected product returned:
```
{
  "id": X,
  "name": "Little Girls Mr. Panda Shirt",
  ...
}
```

---

## Severity
Medium

---

## Root Cause
The API does not appear to be filtering products by the `search_product` parameter correctly.
It may be returning all products or applying a loose/incorrect matching algorithm instead of
filtering results to only those whose name contains the search term.

---

## Status:
Open