import { test, expect } from "@playwright/test";

/* ======================================================
    Playwright Locator Filters 

    1.Verify "Add to cart" for Mouse  
    2.Count items not having "Out of stock"
    3.Find items with "In stock"
    4.Verify elements using data-testid
    5.Count all elements with test ids
    6.Find "Say goodbye" button for John
    7.Find "Say hello" button for Mary
    8.Find "Subscribe" buttons using multiple conditions
    9.Find "details" buttons for done tasks
    10.Verify stock status counts

======================================================*/

//Example-1 (Filter by using "hasText")

test("Verify Add to cart for Mouse", async ({ page }) => {

    await page.goto("https://playwright-qa.lovable.app/locators");

    /* 
    Step-1 (Find all list items)
    Step-2 (Filter the items which contains the Mouse)
    Step-3 (From that item find the button add to card) 
    */

    const productButton = page.getByRole('listitem')
        .filter({ hasText: "Mouse" })
        .getByRole('button', { name: "Add to cart" });
    
    console.log("Product Button: ", await productButton.innerText()); //innerText() method will return the exact string "Add to cart" or else you will get locator object

    await expect(productButton).toBeVisible();
    await productButton.click(); //to click 
    await page.close(); // to  close the browser 

})