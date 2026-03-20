# Bug Report: Clicking "View Product" intermittently redirects to #google_vignette instead of the product detail page
---

## Summary
When a user clicks the View Product link from the Products page, the site intermittently redirects to a URL containing #google_vignette instead of navigating to the intended product detail page. This prevents the product details page from loading normally and interrupts the user flow.

---

## Environment
- URL: https://automationexercise.com/products
- Browser: Chrome 123.0
- OS: Windows 11
- Test Framework: Playwright

---

## Steps to Reproduce
1. Navigate to https://automationexercise.com/products
2. Locate any product in the product listing
3. Click View Product on a product card
4. Observe the resulting page URL and content

---

## Expected Result
User should be navigated to the selected product details page, for example:
https://automationexercise.com/product_details/1

---

## Actual Result
User is intermittently redirected to a URL such as:
https://automationexercise.com/products#google_vignette
The product details page does not load as expected.

---

## Frequency:
Intermittent

---

## Severity 
Medium

---

## Notes:
The issue appears related to an interstitial Google vignette/ad overlay interfering with navigation rather than the View Product element itself. The link can be located and clicked successfully, but post-click navigation is unreliable.

---

## Suggested Fix:
Prevent vignette/ad overlay from intercepting product-detail navigation
Ensure View Product always routes directly to the intended /product_details/{id} URL
Review third-party ad behavior on navigation events for product links

---

## Attachments / Evidence:
Failing URL observed: https://automationexercise.com/products#google_vignette
Expected URL pattern: /product_details/{id}
Playwright error: expect(page).toHaveURL(/\/product_details\/\d+/) failed