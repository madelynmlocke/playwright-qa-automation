# Test Case: Form Validation for Required Fields

## Test ID
FORM-001

## Test Title
Verify that the form displays validation errors when required fields are left empty.

## Test Type
Functional / Input Validation Test

## Preconditions
- User is on the form page
- Form fields are visible and accessible

## Test Steps
1. Navigate to the form page.
2. Leave all required fields empty.
3. Click the `Submit` button.

## Expected Result
- The form should not submit.
- Validation messages should appear indicating required fields must be completed.
- The user should remain on the form page.

## Actual Result
(To be filled during testing)

## Pass / Fail
(To be filled during testing)

## Severity (if failed)
Medium

## Notes
If the form submits successfully without required fields being completed, a validation defect should be logged.

------------------

# Test Case: Form Validation for Invalid Email Format

## Test ID
FORM-002

## Test Title
Verify that the form rejects an invalid email address format.

## Test Type
Functional / Input Validation Test

## Preconditions
- User is on the form page
- Form fields are visible and accessible

## Test Steps
1. Navigate to the form page.
2. Enter a valid name in the `Name` field.
3. Enter an invalid email address in the `Email` field (example: `invalidemail.com`).
4. Enter a valid message in the `Message` field.
5. Click the `Submit` button.

## Expected Result
- The form should not submit.
- A validation message should appear indicating the email format is invalid.
- The user remains on the form page.

## Actual Result
(To be filled during testing)

## Pass / Fail
(To be filled during testing)

## Severity (if failed)
Low

## Notes
If the form accepts an incorrectly formatted email address or fails to display a validation message, a validation defect should be logged.