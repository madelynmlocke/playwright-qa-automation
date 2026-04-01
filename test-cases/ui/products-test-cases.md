# UI Test Cases: Products Endpoints

## Test Case: Products Page Loads and Displays Product List

### Test ID
UI-PRODUCTS-001

### Test Title
Verify that the Products page loads and displays a list of products

### Test Type
UI / Smoke Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the homepage

### Test Steps
1. Navigate to the homepage
2. Click the Products navigation link
3. Verify the page URL contains /products
4. Verify the "All Products" heading is visible
5. Verify at least one product card is visible in the product list

### Expected Result
- Page URL contains /products
- "All Products" heading is visible
- At least one product card is visible
- First product card is visible on the page

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/products.spec.js (`assertAllProductsPageLoaded()`, `assertProductsListVisible()`)

---

## Test Case: Product Detail Page Loads with Correct Fields

### Test ID
UI-PRODUCTS-002

### Test Title
Verify that clicking a product loads the product detail page with all required fields visible

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- At least one product exists in the list

### Test Steps
1. Navigate to the homepage
2. Click the Products navigation link
3. Verify the Products page and product list are loaded
4. Click the View Product link for product ID 1
5. Verify the page URL matches /product_details/{id}
6. Verify the product information section is visible
7. Verify the product name heading is visible
8. Verify the product detail section contains Category
9. Verify the product detail section contains a price starting with "Rs."
10. Verify the product detail section contains Availability
11. Verify the product detail section contains Condition
12. Verify the product detail section contains Brand

### Expected Result
- Page URL matches /product_details/1
- Product information section is visible
- All of the following fields are present: product name, Category, price (Rs.), Availability, Condition, Brand

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/products.spec.js (`viewProductById()`, `assertProductDetailPageLoaded()`, `assertProductDetailFieldsVisible()`)

---

## Test Case: Search Returns Matching Products

### Test ID
UI-PRODUCTS-003

### Test Title
Verify that searching for a product returns matching results

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- At least one product exists matching the search term

### Test Data
| Field | Value |
|-------|-------|
| Search Term | Blue Top |

### Test Steps
1. Navigate to the homepage
2. Click the Products navigation link
3. Verify the Products page is loaded
4. Enter "Blue Top" in the search input
5. Click the Search button
6. Verify the "Searched Products" heading is visible
7. Verify at least one product card is visible
8. Verify every returned product card contains the search term "Blue Top"

### Expected Result
- "Searched Products" heading is visible after search
- At least one product card is returned
- Every product card in the results contains "Blue Top"

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

### Automation Status
✅ Automated — e2e/ui/products.spec.js (`searchForProduct()`, `assertSearchedProductsVisible()`, `assertSearchResultsContain()`)

---

## Test Case: Product Can Be Added to Cart

### Test ID
UI-PRODUCTS-004

### Test Title
Verify that a product can be added to the cart from the Products page

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page

### Test Data
| Field | Value |
|-------|-------|
| Product ID | 1 |
| Product ID | 2 |

### Test Steps
1. Navigate to the homepage
2. Click the Products navigation link
3. Verify the Products page is loaded
4. Click the Add to Cart button for product ID 1
5. Click the Continue Shopping button on the modal
6. Click the Add to Cart button for product ID 2
7. Click the View Cart link
8. Verify product ID 1 is visible in the cart
9. Verify product ID 2 is visible in the cart

### Expected Result
- Both products are visible in the cart after being added
- Cart row with id "product-1" is visible
- Cart row with id "product-2" is visible

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/products.spec.js (`addProductToCart()`, `continueShopping()`, `viewCart()`, `assertProductInCart()`)

---

## Test Case: Product Can Be Removed from Cart

### Test ID
UI-PRODUCTS-005

### Test Title
Verify that a product can be removed from the cart

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- At least one product has been added to the cart

### Test Data
| Field | Value |
|-------|-------|
| Product to Remove | Product ID 1 |
| Product to Remain | Product ID 2 |

### Test Steps
1. Navigate to the homepage
2. Click the Products navigation link
3. Add product ID 1 to the cart
4. Click Continue Shopping
5. Add product ID 2 to the cart
6. Click View Cart
7. Verify both product ID 1 and product ID 2 are in the cart
8. Click the delete button for product ID 1
9. Verify product ID 1 is no longer in the cart
10. Verify product ID 2 remains in the cart

### Expected Result
- After removal, the cart row for product ID 1 has a count of 0
- Product ID 2 remains visible in the cart

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/products.spec.js (`removeProductFromCart()`, `assertProductNotInCart()`, `assertProductInCart()`)

---

## Test Case: Search with No Matching Term Shows Empty Results

### Test ID
UI-PRODUCTS-006

### Test Title
Verify that searching with a term that matches no products shows an empty result

### Test Type
UI / Negative Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- The search term used does not match any existing product

### Test Data
| Field | Value |
|-------|-------|
| Search Term | xyznonexistentproduct123 |

### Test Steps
1. Navigate to the homepage
2. Click the Products navigation link
3. Verify the Products page is loaded
4. Enter a search term that matches no products
5. Click the Search button
6. Verify the "Searched Products" heading is visible
7. Observe the product list area

### Expected Result
- "Searched Products" heading is visible
- No product cards are displayed in the results

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Low

### Automation Status
❌ Not Automated