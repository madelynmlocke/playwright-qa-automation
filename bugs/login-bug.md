# Bug Report: Login button fails when password field is empty
---

## Summary
Clicking the **"Profile"** link in the main navigation menu redirects the user to the dashboard instead of the profile page.

---

## Environment
- Browser: Chrome 123.0
- Operating System: Windows 11
- Test Environment: Staging
- Application Version: v1.2.4

---

## Steps to Reproduce:
1. Navigate to login page
2. Enter username
3. Leave password blank
4. Click login

---

## Expected Result:
Validation message appears

---

## Actual Result:
Page reloads without error message

---

## Severity:
Medium

---

## Fix:
Added client-side validation

---

## Status:
Open