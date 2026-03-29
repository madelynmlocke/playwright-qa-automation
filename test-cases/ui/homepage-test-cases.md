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
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/homepage.spec.js (`gotoHomePage()`)

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

### Expected Result
- Header is visible on the page
- Footer is visible on the page

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

### Automation Status
✅ Automated — e2e/ui/homepage.spec.js (`assertLayout()`)

---

## Test Case: Logo Is Visible

### Test ID
UI-HOME-003

### Test Title
Verify that the site logo is visible on the homepage

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User has navigated to the homepage

### Test Steps
1. Navigate to the homepage
2. Observe the logo image

### Expected Result
- Logo image with alt text "Website for automation practice" is visible

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Low

### Automation Status
✅ Automated — e2e/ui/homepage.spec.js (`assertLogo()`)

---

## Test Case: Hero Banner Is Visible

### Test ID
UI-HOME-004

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
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

### Automation Status
✅ Automated — e2e/ui/homepage.spec.js (`assertHero()`)

---

## Test Case: All Navigation Links Are Visible

### Test ID
UI-HOME-005

### Test Title
Verify that all expected navigation links are visible on the homepage

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
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/homepage.spec.js (`assertNavLinksVisible()`)