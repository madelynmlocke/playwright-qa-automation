# UI Test Cases: Contact Form Endpoints

## Test Case: Contact Form Fields Are Visible

### Test ID
UI-CONTACT-001

### Test Title
Verify that the Contact Us page loads and all form fields are visible

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the homepage

### Test Steps
1. Navigate to the homepage
2. Click the Contact Us navigation link
3. Verify the page URL contains /contact_us
4. Verify the "Get In Touch" heading is visible
5. Verify the Name field is visible
6. Verify the Email field is visible
7. Verify the Subject field is visible
8. Verify the Message field is visible
9. Verify the Submit button is visible

### Expected Result
- Page URL contains /contact_us
- "Get In Touch" heading is visible
- All four form fields (Name, Email, Subject, Message) are visible
- Submit button is visible

### Actual Result
(To be filled during testing)

### Pass / Fail
Pass

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/contact-form.spec.js (`assertForm()`)

---

## Test Case: Contact Form Submits Successfully with Valid Data

### Test ID
UI-CONTACT-002

### Test Title
Verify that the contact form can be submitted successfully with valid input

### Test Type
UI / Functional Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Contact Us page
- All form fields are visible

### Test Steps
1. Navigate to the homepage
2. Click the Contact Us navigation link
3. Fill in the Name field with a valid name
4. Fill in the Email field with a valid email address
5. Fill in the Subject field with a valid subject
6. Fill in the Message field with a valid message
7. Accept the browser dialog when it appears
8. Click the Submit button
9. Observe the result

### Test Data
| Field | Value |
|-------|-------|
| Name | maddy |
| Email | (valid registered email) |
| Subject | test |
| Message | testing a message |

### Expected Result
- Form submits without errors
- Success message is visible: "Success! Your details have been submitted successfully."

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
High

### Automation Status
✅ Automated — e2e/ui/contact-form.spec.js (`fillForm()`, `submitForm()`, `assertSubmission()`)

---

## Test Case: Contact Form Shows Error When Required Fields Are Missing

### Test ID
UI-CONTACT-003

### Test Title
Verify that the contact form does not submit when required fields are left empty

### Test Type
UI / Negative Test

### Preconditions
- Application is accessible at https://automationexercise.com
- User is on the Contact Us page
- All form fields are visible

### Test Steps
1. Navigate to the homepage
2. Click the Contact Us navigation link
3. Leave all form fields empty
4. Click the Submit button
5. Observe the result

### Expected Result
- Form does not submit
- Validation error is displayed indicating required fields must be completed
- User remains on the /contact_us page

### Actual Result
(To be filled during testing)

### Pass / Fail
(To be filled during testing)

### Severity (if failed)
Medium

### Automation Status
❌ Not Automated