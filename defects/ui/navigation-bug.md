# Bug Report: Navigation Link Redirects to Incorrect Page
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
1. Navigate to the homepage
2. Log in with valid credentials
3. Click the **"Profile"** link in the top navigation bar

---

## Expected Result
User should be redirected to the **Profile page** where account information can be viewed and edited.

---

## Actual Result
User is redirected to the **Dashboard page** instead of the Profile page.

---

## Severity
Medium

---

## Root Cause
The navigation link points to `/dashboard` instead of `/profile`.

Example code:

<a href="/dashboard">Profile</a>

Correct code should be:
<a href="/profile">Profile</a>

---

## Status: 
Resolved