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
UI-HOME-003

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

---

## Test Case: Scroll Up and Scroll Down Functionality

### Test ID
UI-HOME-006

### Test Title
Verify scroll down and scroll up functionality using mouse wheel, PageDown key, and scroll-up arrow button

### Test Type
UI / Integration / Regression

### Preconditions
- Application is accessible at https://automationexercise.com
- User has navigated to the homepage

### Test Steps
1. Navigate to the homepage
2. Scroll down the page using mouse wheel (10 times, 500px per scroll)
3. Continue scrolling down using the PageDown key (5 times)
4. Verify the subscription section and scroll-up button are visible in the footer
5. Click the scroll-up arrow button to return to the top of the page

### Expected Result
- Page scrolls down smoothly via mouse wheel and PageDown key
- Subscription heading, input field, and submit button are visible after scrolling to the footer
- Scroll-up arrow button is visible in the footer
- Clicking the scroll-up arrow button returns the user to the top of the page

### Actual Result
- Page scrolled down successfully via mouse wheel and PageDown key
- Subscription section elements (heading, input, button) were visible in the footer
- Scroll-up arrow button was visible and clickable
- Page returned to the top after clicking the scroll-up button

### Pass / Fail
Pass

### Severity (if failed)
Medium

### Notes
- `scrollDown()` and `scrollWithPageDown()` are defined as POM methods on `homePage` and accept optional parameters for scroll count and pixel distance
- `assertSub()` validates footer subscription UI elements and the scroll-up button visibility
- `scrollWithButton()` clicks the arrow button to trigger scroll-up behavior
- Tags: `@integration` `@regression`