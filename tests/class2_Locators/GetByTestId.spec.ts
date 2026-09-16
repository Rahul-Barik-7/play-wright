import {test, expect} from "@playwright/test"

test ("Playwright test - getByTestId", async ({page})=>{
    await page.goto("https://playwright-qa.lovable.app/locators")

    /* 
        1. getByTestId() is used to locate an element using its data-testid attribute.
        2. syntax: page.getByTestId("test-id")
        3. It is especially useful when:
            3.1 The element has no reliable text
            3.2 There are duplicate elements
            3.3 CSS classes are dynamically generated
            3.4 You want a dedicated, stable locator for automation

    */
    let testid = page.getByTestId("primary-widget");
    await expect(testid).toContainText('Widget A — data-state="active"');

    /* 
        if tommorow dev change/rename the testid attribute then you can still access it adding it in config below 
        use {
            testIdAttribute: 'data-pw'
        }
        <div data-testid="primary-widget" data-state="active" data-index="1" class="surface p-4 text-sm">Widget A — data-state="active"</div>
    */

    
});