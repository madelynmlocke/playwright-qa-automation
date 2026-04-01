# Bug Report: Contact Form Accepts Submission with Only Email Filled — All Other Required Fields Ignored
---

## Bug ID
BUG-UI-CONTACT-001

## Summary
When a user fills in only the Email field and leaves Name, Subject, and Message empty, the Contact Us form submits successfully. 
No validation error is triggered for the missing required fields, allowing an incomplete form submission to go through.

---

## Environment
- URL: https://automationexercise.com/contact_us
- Browser: Chrome
- OS: Windows 11
- Test Framework: Playwright

---

## Steps to Reproduce
1. Navigate to https://automationexercise.com/contact_us
2. Leave the Name, Subject, and Message fields empty
3. Enter a valid email address in the Email field only
4. Click the Submit button
5. Observe the result

---

## Expected Result
Form submission should be blocked. The Name, Subject, and Message fields should be enforced as required, 
and the user should receive a validation error prompting them to fill in the missing fields before submitting.

---

## Actual Result
The form submits successfully with only the Email field populated. No validation errors are shown for Name, Subject, or Message. 
The form proceeds as if all required fields were completed.

---

## Frequency
Consistent / 100% reproducible

---

## Severity
High

---

## Notes
- The Email field correctly enforces the `required` attribute — leaving it empty triggers a native browser validation tooltip and blocks submission
- Name, Subject, and Message fields appear to have `required` in the HTML but are not being enforced on submission
- This is a client-side validation failure; the form should not reach submission with incomplete data
- Discovered during negative test coverage of the contact form

---

## Suggested Fix
- Verify that the `required` attribute is properly applied to the Name, Subject, and Message input elements
- Add or fix client-side validation logic to block form submission when any required field is empty
- Consider adding server-side validation as a secondary safeguard

---

## Attachments / Evidence
- Playwright assertion `validity.valueMissing: true` passes for Email field when empty, confirming `required` is enforced there
- Same assertion on Name, Subject, and Message fields expected to return `true` but form submits without triggering validation