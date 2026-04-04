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
- Page URL contains /products
- "All Products" heading is visible
- At least one product card is visible
- First product card is visible on the page

### Pass / Fail
Pass

### Severity (if failed)
High

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
- Page URL matches /product_details/1
- Product information section is visible
- All of the following fields are present: product name, Category, price (Rs.), Availability, Condition, Brand

### Pass / Fail
Pass

### Severity (if failed)
High

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
- "Searched Products" heading is visible after search
- At least one product card is returned
- Every product card in the results contains "Blue Top"

### Pass / Fail
Pass

### Severity (if failed)
Medium

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
- Both products are visible in the cart after being added
- Cart row with id "product-1" is visible
- Cart row with id "product-2" is visible

### Pass / Fail
Pass

### Severity (if failed)
High

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
- After removal, the cart row for product ID 1 has a count of 0
- Product ID 2 remains visible in the cart

### Pass / Fail
Pass

### Severity (if failed)
High

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

---

## Test Case: Verify Product Quantity in Cart

### Test ID
UI-PRODUCTS-007

### Test Title
Verify that adding the same product twice results in a quantity of 2 in the cart

### Test Type
UI / Regression

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- Cart is empty

### Test Steps
1. Navigate to the Products page
2. Add product with ID 5 to the cart
3. Click "Continue Shopping" to dismiss the modal
4. Add product with ID 5 to the cart again
5. Click "View Cart"
6. Verify the quantity displayed for the product

### Expected Result
- The quantity button displays "2" for the product in the cart

### Actual Result
- The quantity button displays "2" for the product in the cart

### Pass / Fail
Pass

### Severity (if failed)
High

---

## Test Case: View Category Products and Verify Sub Category

### Test ID
UI-PRODUCTS-008

### Test Title
Verify that navigating through a category and sub category loads the correct products page

### Test Type
UI / Smoke

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- The left sidebar is visible

### Test Steps
1. Navigate to the Products page
2. Verify the "Category" heading is visible in the sidebar
3. Verify the "Women" category link is visible
4. Click the "Women" category link to expand it
5. Verify the "Dress" sub category link is visible
6. Click the "Dress" sub category link
7. Verify the page URL contains /category_products/ followed by a numeric ID
8. Verify the page sub heading contains "Women"

### Expected Result
- "Category" heading is visible
- "Women" category is visible and expandable
- "Dress" sub category is visible after expanding Women
- Page URL matches /category_products/\d+
- Sub heading on the page contains "Women"

### Actual Result
- "Category" heading is visible
- "Women" category is visible and expandable
- "Dress" sub category is visible after expanding Women
- Page URL matches /category_products/\d+
- Sub heading on the page contains "Women"

### Pass / Fail
Pass

### Severity (if failed)
Medium

---

## Test Case: View and Cart Brand Products

### Test ID
UI-PRODUCTS-009

### Test Title
Verify that navigating to a brand from the sidebar loads the correct brand products page

### Test Type
UI / Smoke

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- The left sidebar is visible

### Test Steps
1. Navigate to the Products page
2. Verify the "Brands" heading is visible in the sidebar
3. Verify the "Polo" brand link is visible
4. Click the "Polo" brand link
5. Verify the page URL contains /brand_products/Polo (case-insensitive)
6. Verify the page sub heading contains "Polo"

### Expected Result
- "Brands" heading is visible in the sidebar
- "Polo" brand link is visible
- Page URL matches /brand_products\/Polo/i after clicking
- Sub heading on the page contains "Polo"

### Actual Result
- "Brands" heading is visible in the sidebar
- "Polo" brand link is visible
- Page URL matches /brand_products\/Polo/i after clicking
- Sub heading on the page contains "Polo"

### Pass / Fail
Pass

### Severity (if failed)
Medium

---

## Test Case: Search Products and Verify Cart After Login

### Test ID
UI-PRODUCTS-010

### Test Title
Verify that products found via search can be added to the cart and persist after login

### Test Type
UI / Regression / Integration

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Products page
- User has valid credentials available
- Cart is empty before the test runs

### Test Steps
1. Navigate to the Products page
2. Verify the "All Products" sub heading is visible
3. Search for "jeans"
4. Verify the "Searched Products" heading is visible
5. Verify all displayed product cards contain the word "jeans" (case-insensitive)
6. Add all visible search result products to the cart, clicking "Continue Shopping" between each and "View Cart" on the last
7. Navigate to the Login page
8. Log in with valid credentials
9. Verify the user is logged in
10. Navigate to the Cart page
11. Verify all products in the cart were add and contain the word "jeans"

### Expected Result
- Search returns only products matching "jeans"
- All matching products are added to the cart successfully
- After logging in, the cart still contains the previously added products
- All cart items contain "jeans" in their product name

### Actual Result
- Search returns only products matching "jeans"
- All matching products are added to the cart successfully
- After logging in, the cart still contains the previously added products
- All cart items contain "jeans" in their product name

### Pass / Fail
Pass

### Severity (if failed)
High