![Playwright Tests](https://github.com/madelynmlocke/playwright-qa-automation/actions/workflows/playwright.yml/badge.svg)

# QA Automation Testing Project

## Project Overview
This project demonstrates automated UI and API testing using Playwright and JavaScript. 
The goal is to validate core application functionality through automated test scenarios covering
 navigation, authentication, form validation, UI, and API response handling.

The repository simulates a simplified QA automation workflow, combining automated test scripts,
 manual test case documentation, and defect reports to demonstrate common testing practices 
 used in real development environments.

## Technologies Used
- Playwright - UI and API test automation
- JavaScript - test scripting
- Node.js - runtime environment 

## Project Purpose
This project demonstrates key QA engineering concepts including: 
- Automated UI testing
- API response validation
- Test case design
- Defect documentation
- Positive and negative test scenarios

The repository includes:
- Automated Playwright test scripts
- End to End automated workflows
- Manual test case documentation
- Defect reports
- Test coverage tracking

## Project Structure
```md 
playwright-qa-automation
│
├── .github
│    └── workflows
│      └── playwright.yml
│
├── utils
│     ├── apiClient.js
│     ├── apiAssertions.js
│     └── userFactory.js
│
├── pages
│     ├── ContactPage.js
│     ├── HomePage.js
│     ├── LoginPage.js
│     └── ProductPage.js
│
├── e2e
│     ├── ui
│     │    ├── contact-form.spec.js
│     │    ├── homepage.spec.js
│     │    ├── login.spec.js
│     │    └── products.spec.js
│     │
│     ├── api
│     │     ├── account.api.spec.js
│     │     ├── auth.api.spec.js
│     │     ├── brands.api.spec.js
│     │     ├── products.api.spec.js
│     │     └── search.api.spec.js
│     │ 
│     └── workflows
│           ├── api
│           │     ├── account-workflow.spec.js
│           │     └── user-workflow.spec.js
│           │     
│           │ 
│           └── ui
│                └── products-workflow.spec.js
│
├── test-cases
│     ├── ui
│     │    ├── homepage-test-cases.md
│     │    ├── products-test-cases.md
│     │    ├── login-test-cases.md
│     │    └── contact-form-test-cases.md
│     │
│     └── api
│         ├── accounts-api-test-cases.md
│         ├── auth-api-test-cases.md
│         ├── brands-api-test-cases.md
│         ├── products-api-test-cases.md
│         └── search-api-test-cases.md
│
├── defects
│     ├── ui
│     │    └── BUG-UI-PRODUCTS-URL-001.md
│     │
│     └── api
│         ├── BUG-API-DELETE-LOGIN-001.md
│         ├── BUG-API-POST-CREATE-001.md
│         ├── BUG-API-POST-INVALID-LOGIN-001.md
│         ''(Rest of defects)''
│
└── README.md
```
### e2e/
Contains automated Playwright test scripts that validate UI behavior and API responses.

### test-cases/
Contains manual QA test cases describing expected application behavior and test steps.

### defects/
Contains example bug reports documenting reproducible issues discovered during testing.

### pages/
Contains resuable locators and methods for automated UI test cases.

### utils/
Contains reusable helper assertions and functions for API test cases.

### .github/workflows/playwright
This project includes a GitHub Actions workflow that automatically runs Playwright tests on every 
push and pull request to the `main` branch.

CI workflow location:
.github/workflows/playwright.yml

## Test Coverage

The following table maps each automated test to its corresponding test case document and spec file.
Test cases marked as Not Automated are documented in the test-cases/ folder and are candidates
for future automation.

### API Coverage

| Test ID | Description | Spec File | Status |
|---------|-------------|-----------|--------|
| API-PRODUCTS-001 | GET /api/productsList returns valid product data | e2e/api/products.api.spec.js | ✅ Automated |
| API-PRODUCTS-002 | POST /api/productsList returns 405 | e2e/api/products.api.spec.js | ✅ Automated |
| API-PRODUCTS-003 | Product data consistent across products, brands, and search | e2e/workflows/api/products-workflow.spec.js | ✅ Automated |
| API-SEARCH-001 | Search with valid term successfully returns related results | e2e/api/search.api.spec.js | ✅ Automated |
| API-SEARCH-002 | Search Product with Missing Parameter throws error | e2e/api/search.api.spec.js | ✅ Automated |
| API-SEARCH-003 | Search with no matching term returns empty array | e2e/api/search.api.spec.js | ✅ Automated |
| API-SEARCH-004 | Search with with single character returns results | e2e/api/search.api.spec.js | ✅ Automated |
| API-BRANDS-001 | GET /api/brandsList returns valid brand data | e2e/api/brands.api.spec.js | ✅ Automated |
| API-BRANDS-002 | PUT /api/brandsList returns 405 | e2e/api/brands.api.spec.js | ✅ Automated |
| API-BRANDS-003 | Brands in /api/brandsList are consistent with /api/productsList | e2e/workflows/api/products-workflow.spec.js | ✅ Automated |
| API-AUTH-001 | POST /api/verifyLogin returns 200 with valid credentials | e2e/api/auth.api.spec.js | ✅ Automated |
| API-AUTH-002 | POST /api/verifyLogin returns 400 when credentials are missing | e2e/api/auth.api.spec.js | ✅ Automated |
| API-AUTH-003 | POST /api/verifyLogin returns 404 with invalid credentials | e2e/api/auth.api.spec.js | ✅ Automated |
| API-AUTH-004 | DELETE /api/verifyLogin returns 405 for unsupported method | e2e/api/auth.api.spec.js | ✅ Automated |
| API-AUTH-006 | GET /api/verifyLogin returns 405 for unsupported method | e2e/api/auth.api.spec.js | ✅ Automated |
| API-AUTH-005 | POST /api/verifyLogin returns 404 after account deletion | e2e/workflows/api/account-workflow.spec.js | ✅ Automated |
| API-ACCOUNT-001 | POST /api/createAccount creates a new user account | e2e/api/account.api.spec.js | ✅ Automated |
| API-ACCOUNT-002 | GET /api/getUserDetailByEmail returns correct account details | e2e/api/account.api.spec.js | ✅ Automated |
| API-ACCOUNT-003 | PUT /api/updateAccount successfully updates an existing account | e2e/api/account.api.spec.js | ✅ Automated |
| API-ACCOUNT-004 | DELETE /api/deleteAccount successfully removes a user account | e2e/api/account.api.spec.js | ✅ Automated |
| API-ACCOUNT-005 | Account data consistent across create, login, update, and delete | e2e/workflows/api/account-workflow.spec.js | ✅ Automated |
| API-ACCOUNT-006 | POST /api/createAccount returns error for duplicate email | e2e/api/account.api.spec.js | ✅ Automated |
| API-ACCOUNT-007 | POST /api/createAccount returns error when email is missing | e2e/api/account.api.spec.js | ✅ Automated |
| API-ACCOUNT-008 | GET /api/getUserDetailByEmail returns error for invalid credentials | e2e/api/account.api.spec.js | ✅ Automated |
| API-ACCOUNT-009 | DELETE /api/deleteAccount returns error for invalid credentials | e2e/api/account.api.spec.js | ✅ Automated |

### UI Coverage

| Test ID | Description | Spec File | Status |
|---------|-------------|-----------|--------|
| UI-HOME-001 | Homepage loads with correct title and URL | e2e/ui/homepage.spec.js | ✅ Automated |
| UI-HOME-002 | Header, footer, hero, and logo are visible | e2e/ui/homepage.spec.js | ✅ Automated |
| UI-HOME-003 | All navigation links are visible | e2e/ui/homepage.spec.js | ✅ Automated |
| UI-LOGIN-001 | User can register a new account and delete it | e2e/ui/login.spec.js | ✅ Automated |
| UI-LOGIN-002 | User can log in with valid credentials | e2e/ui/login.spec.js | ✅ Automated |
| UI-LOGIN-003 | Login shows error for invalid credentials | e2e/ui/login.spec.js | ✅ Automated |
| UI-LOGIN-004 | Login attempt with empty password | — | ❌ Not Automated |
| UI-LOGIN-005 | Sign up shows error when using existing email | e2e/ui/login.spec.js | ✅ Automated |
| UI-LOGIN-006 | User can log out successfully | — | ❌ Not Automated |
| UI-CONTACT-001 | Contact form fields are visible | e2e/ui/contact-form.spec.js | ✅ Automated |
| UI-CONTACT-002 | Contact form can be submitted successfully | e2e/ui/contact-form.spec.js | ✅ Automated |
| UI-CONTACT-003 | Contact form shows error when required fields are missing | — | ❌ Not Automated |
| UI-PRODUCTS-001 | Products page loads and displays product list | e2e/ui/products.spec.js | ✅ Automated |
| UI-PRODUCTS-002 | Product detail page loads with correct fields | e2e/ui/products.spec.js | ✅ Automated |
| UI-PRODUCTS-003 | Search returns matching products | e2e/ui/products.spec.js | ✅ Automated |
| UI-PRODUCTS-004 | Product can be added to cart | e2e/ui/products.spec.js | ✅ Automated |
| UI-PRODUCTS-005 | Product can be removed from cart | e2e/ui/products.spec.js | ✅ Automated |
| UI-PRODUCTS-006 | Search with no matching term shows empty results | — | ❌ Not Automated |
| UI-WORKFLOW-001 | User can complete full lifecycle via UI | e2e/workflows/ui/user-workflow.spec.js | ✅ Automated |

### Defect Summary

| Bug ID | Endpoint / Area | Description | Severity | Status |
|--------|----------------|-------------|----------|--------|
| BUG-API-POST-LOGIN-001 | POST /api/verifyLogin | Returns HTTP 200 instead of 400 when credentials are missing | Medium | Open |
| BUG-API-POST-LOGIN-002 | POST /api/verifyLogin | Returns HTTP 200 instead of 404 for invalid credentials | Medium | Open |
| BUG-API-DELETE-LOGIN-001 | DELETE /api/verifyLogin | Returns HTTP 200 instead of 405 for unsupported method | Medium | Open |
| BUG-API-POST-PRODUCTSLIST-001 | POST /api/productsList | Returns HTTP 200 instead of 405 for unsupported method | Medium | Open |
| BUG-API-POST-SEARCH-001 | POST /api/searchProduct | Returns products that do not contain or match exact search term | Medium | Open |
| BUG-API-POST-SEARCH-002 | POST /api/searchProduct | Returns HTTP 200 instead of 400 when parameter is missing | Medium | Open |
| BUG-API-POST-SEARCH-TOP-001 | POST /api/searchProduct | Generic search term returns unrelated products | Medium | Open |
| BUG-API-PUT-BRANDSLIST-001 | PUT /api/brandsList | Returns HTTP 200 instead of 405 for unsupported method | Medium | Open |
| BUG-API-POST-CREATE-001 | POST /api/createAccount | Returns HTTP 200 instead of 201 on successful account creation | Medium | Open |
| BUG-API-POST-CREATE-002 | POST /api/createAccount | Body returns 'Email Already exists' instead of bad request | Medium | Open |
| BUG-API-POST-CREATE-003 | POST /api/createAccount | Sending missing password POST request does not return error | Medium | Open |
| BUG-UI-PRODUCTS-URL-001 | UI / Products | View Product link unreliable due to ad overlay interference | Medium | Open |

### Coverage Summary

| Category | Total Test Cases | Automated | Not Automated |
|----------|-----------------|-----------|---------------|
| API - Products | 5 | 5 | 0 |
| API - Search | 5 | 3 | 2 |
| API - Brands | 4 | 4 | 0 |
| API - Auth | 5 | 5 | 0 |
| API - Account | 5 | 5 | 0 |
| UI - Homepage | 5 | 5 | 0 |
| UI - Login | 6 | 4 | 2 |
| UI - Contact Form | 3 | 2 | 1 |
| UI - Products | 6 | 5 | 1 |
| UI - Workflows | 1 | 1 | 0 |
| **Total** | **45** | **39** | **6** |

## Test Scenarios
The automated tests validate a variety of application behaviors.

### UI Tests
Examples include:

- Homepage loads successfully and displays core interface elements
- Navigation links redirect users to the correct pages
- Login functionality authenticates valid users
- Form validation prevents submission of invalid input
- Products are searchable and viewable in cart

### API Tests
Examples include:

- API endpoint returns HTTP 200 with valid JSON data
- Invalid endpoints return appropriate error responses (404)

## Running the Tests
```bash
npm install
npx playwright install
npx playwright test
```

## Test Execution Report
Playwright provides a built-in HTML dashboard for reviewing test results across browsers.

![Playwright Report](assets/playwright-report.png)

## Continuous Integration
Tests run automatically on every push using GitHub Actions.

![GitHub CI](assets/github-actions.png)

## Debugging Failed Tests
Playwright captures traces, logs, and screenshots to help diagnose failures.

![Playwright Debug](assets/test-debug-view.png)

## Defect Documentation
The repository includes sample defect reports demonstrating how issues are documented in a QA workflow.

Bug reports may include:

- Summary
- Environment
- Steps to reproduce
- Expected result
- Actual result
- Severity
- Root Cause
- Suggested Fix
- Status

This mirrors real bug tracking systems such as:

- Jira
- Azure DevOps
- Bugzilla

## Future Improvements
Potential enhancements for this project include:

- Adding cross-browser testing
- Expanding API test coverage
- Adding performance or load testing scenarios
- Create reusable functions, helpers, and fixtures
- Remove duplicate logic and make scalable
- add visual regression tests

## Learning Goals
This project was created to practice and demonstrate:

- Automated testing frameworks
- QA documentation standards
- Debugging and defect reproduction
- Structured test design