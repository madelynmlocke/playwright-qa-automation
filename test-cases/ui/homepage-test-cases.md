# UI Test Cases: Homepage Endpoints

## Test Case: Homepage Loads with Correct Title and URL

### Test ID
UI-HOME-001

### Test Title
Verify that the homepage loads with the correct URL and page title

### Test Type
UI / Smoke Test

### Preconditions
- Application is accessible at https://automationexercise.com

### Test Steps
1. Navigate to https://automationexercise.com
2. Observe the page URL
3. Observe the page title

### Expected Result
- URL matches https://automationexercise.com or https://automationexercise.com/
- Page title contains "Automation Exercise"

### Actual Result
- URL matches https://automationexercise.com or https://automationexercise.com/
- Page title contains "Automation Exercise"

### Pass / Fail
Pass

### Severity (if failed)
High

---

## Test Case: Header and Footer Are Visible

### Test ID
UI-HOME-002

### Test Title
Verify that the header and footer are visible on the homepage

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User has navigated to the homepage

### Test Steps
1. Navigate to the homepage
2. Observe the header element
3. Observe the footer element
4. Observe the logo element
5. Observe the hero element

### Expected Result
- Header, footer, hero, and logo are visible on the page

### Actual Result
- Header, footer, hero, and logo are visible on the page

### Pass / Fail
Pass

### Severity (if failed)
Medium

---

### Test ID
UI-HOME-003

### Test Title
Verify that the hero banner heading is visible on the homepage

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User has navigated to the homepage

### Test Steps
1. Navigate to the homepage
2. Observe the hero banner section

### Expected Result
- Heading "Full-Fledged practice website for Automation Engineers" is visible

### Actual Result
- Heading is visible

### Pass / Fail
Pass

### Severity (if failed)
Medium

---

## Test Case: All Navigation Links Are Visible and Redirect to correct pages

### Test ID
UI-HOME-005

### Test Title
Verify that all expected navigation links are visible and redirect correctly on the homepage

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User has navigated to the homepage

### Test Steps
1. Navigate to the homepage
2. Observe the navigation bar
3. Verify each expected link is visible

### Expected Links
| Link Text |
|-----------|
| Home |
| Products |
| Cart |
| Signup / Login |
| Test Cases |
| API Testing |
| Video Tutorials |
| Contact us |

### Expected Result
- All eight navigation links listed above are visible in the navigation bar

### Actual Result
- All eight navigation links listed above are visible in the navigation bar, and each link redirects to their respective URL.

### Pass / Fail
Pass

### Severity (if failed)
High
