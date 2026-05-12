# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\tests\transfer.spec.ts >> Fund Transfer >> transfer thất bại với số tiền bằng 0 @regression
- Location: src\e2e\tests\transfer.spec.ts:24:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.error')
Expected: visible
Error: strict mode violation: locator('.error') resolved to 3 elements:
    1) <p class="error" id="amount.errors">↵⇆⇆⇆The amount cannot be empty. ↵⇆⇆</p> aka getByText('The amount cannot be empty.')
    2) <p class="error" id="amount.errors">↵⇆⇆⇆Please enter a valid amount.↵⇆⇆</p> aka getByText('Please enter a valid amount.')
    3) <p class="error">↵⇆⇆⇆An internal error has occurred and has been l…</p> aka getByText('An internal error has')

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for locator('.error')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome John Smith
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Transfer Complete!" [level=1] [ref=e51]
        - paragraph [ref=e52]: "$0.00 has been transferred from account #12345 to account #12456."
        - paragraph [ref=e53]: See Account Activity for more details.
  - generic [ref=e55]:
    - list [ref=e56]:
      - listitem [ref=e57]:
        - link "Home" [ref=e58] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e59]:
        - link "About Us" [ref=e60] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e61]:
        - link "Services" [ref=e62] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e63]:
        - link "Products" [ref=e64] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e65]:
        - link "Locations" [ref=e66] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e67]:
        - link "Forum" [ref=e68] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e69]:
        - link "Site Map" [ref=e70] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e71]:
        - link "Contact Us" [ref=e72] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e73]: © Parasoft. All rights reserved.
    - list [ref=e74]:
      - listitem [ref=e75]: "Visit us at:"
      - listitem [ref=e76]:
        - link "www.parasoft.com" [ref=e77] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class TransferPage extends BasePage {
  5  |   private readonly amountInput: Locator;
  6  |   private readonly fromAccountSelect: Locator;
  7  |   private readonly toAccountSelect: Locator;
  8  |   private readonly transferButton: Locator;
  9  |   private readonly successMessage: Locator;
  10 |   private readonly errorMessage: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     super(page);
  14 |     this.amountInput       = page.locator('#amount');
  15 |     this.fromAccountSelect = page.locator('#fromAccountId');
  16 |     this.toAccountSelect   = page.locator('#toAccountId');
  17 |     this.transferButton    = page.locator('input[value="Transfer"]');
  18 |     this.successMessage    = page.locator('#showResult');
  19 |     this.errorMessage      = page.locator('.error');
  20 |   }
  21 | 
  22 |   async goto() {
  23 |     await this.navigate('parabank/transfer.htm');
  24 |     await this.waitForPageLoad();
  25 |   }
  26 | 
  27 |   async transfer(amount: string, fromIndex: number = 0, toIndex: number = 1) {
  28 |     await this.amountInput.fill(amount);
  29 | 
  30 |     const fromOptions = await this.fromAccountSelect.locator('option').all();
  31 |     if (fromOptions.length > fromIndex) {
  32 |       await this.fromAccountSelect.selectOption({ index: fromIndex });
  33 |     }
  34 | 
  35 |     const toOptions = await this.toAccountSelect.locator('option').all();
  36 |     if (toOptions.length > toIndex) {
  37 |       await this.toAccountSelect.selectOption({ index: toIndex });
  38 |     }
  39 | 
  40 |     await this.transferButton.click();
  41 |     await this.waitForPageLoad();
  42 |   }
  43 | 
  44 |   async expectTransferSuccess() {
  45 |     await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  46 |     await expect(this.successMessage).toContainText('Transfer Complete');
  47 |   }
  48 | 
  49 |   async expectTransferError() {
> 50 |     await expect(this.errorMessage).toBeVisible({ timeout: 8000 });
     |                                     ^ Error: expect(locator).toBeVisible() failed
  51 |   }
  52 | }
```