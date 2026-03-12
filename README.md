![Playwright Tests](https://github.com/madelynmlocke/playwright-qa-automation/actions/workflows/playwright.yml/badge.svg)

# QA Automation Testing Project

## Project Overview

This project demonstrates automated UI and API testing using Playwright and JavaScript. 
The goal is to validate core application functionality through automated test scenarios covering
 navigation, authentication, form validation, and API response handling.

The repository simulates a simplified QA automation workflow, combining automated test scripts,
 manual test case documentation, and defect reports to demonstrate common testing practices 
 used in real development environments.

## Project Purpose

This project demonstrates key QA engineering concepts including: 
- Automated UI testing
- API response validation
- Test case design
- Defect documentation
- Positive and negative test scenarios

The repository includes:
- Automated Playwright test scripts
- Manual test case documentation
- Defect reports
- Test coverage tracking

## Tools Used
- Playwright - UI and API test automation
- JavaScript - test scripting
- Node.js - runtime environment 

## Project Structure
qa-automation-suite
│
├── .github
│   ├── workflows
│      ├──playwright.yml
│
├── tests
│   ├── homepage.spec.js
│   ├── navigation.spec.js
│   ├── login-authentication.spec.js
│   ├── form-validation.spec.js
│   └── api-response.spec.js
│
├── test-cases
│   ├── homepage-test.md
│   ├── navigation-test.md
│   ├── login-tests.md
│   ├── form-validation-test.md
│   └── api-response-test.md
│
├── defects
│   └── navigation-bug.md
│
└── README.md

--tests/
Contains automated Playwright test scripts that validate UI behavior and API responses.

--test-cases/
Contains manual QA test cases describing expected application behavior and test steps.

--defects/
Contains example bug reports documenting reproducible issues discovered during testing.

--github/workflows/playwright
This project includes a GitHub Actions workflow that automatically runs Playwright tests on every 
push and pull request to the `main` branch.

CI workflow location:
.github/workflows/playwright.yml

## Test Coverage
- Page load verification
- Login functionality
- Form validation
- Navigation links
- API response validation

| Test ID   | Feature Tested | Test Type | Automation | Status |
|-----------|---------------|-----------|------------|--------|
| HOME-001  | Homepage load verification | UI Smoke Test | Automated | Complete |
| NAV-001   | Profile navigation link | UI Functional | Automated | Complete |
| LOGIN-001 | Login with valid credentials | Authentication | Automated | Complete |
| LOGIN-002 | Login with empty password | Input Validation | Automated | Complete |
| FORM-001  | Form required fields validation | Input Validation | Automated | Complete |
| FORM-002  | Invalid email format validation | Input Validation | Automated | Complete |
| API-001   | API successful response | API Functional | Automated | Complete |
| API-002   | API invalid endpoint response | API Negative Test | Automated | Complete |

## Test Scenarios

The automated tests validate a variety of application behaviors.

### UI Tests

Examples include:

- Homepage loads successfully and displays core interface elements
- Navigation links redirect users to the correct pages
- Login functionality authenticates valid users
- Form validation prevents submission of invalid input

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

## Defect Documentation

The repository includes sample defect reports demonstrating how issues are documented in a QA workflow.

Bug reports include:

- Summary
- Environment
- Steps to reproduce
- Expected result
- Actual result
- Severity

This mirrors real bug tracking systems such as:

- Jira
- Azure DevOps
- Bugzilla

## Future Improvements

Potential enhancements for this project include:

- Adding cross-browser testing
- Implementing CI test execution using GitHub Actions
- Expanding API test coverage
- Adding performance or load testing scenarios

## Learning Goals

This project was created to practice and demonstrate:

- Automated testing frameworks
- QA documentation standards
- Debugging and defect reproduction
- Structured test design