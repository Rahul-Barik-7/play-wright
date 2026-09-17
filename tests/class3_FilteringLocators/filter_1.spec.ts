import { test, expect } from "@playwright/test";

/* ======================================================
    Playwright Locator Filters 

    1.Verify "Add to cart" for Mouse  - hasText
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

//Hooks - runs before each test , its just like a anotation 
//as we are creating multiplt test so not need to write same goto() every time
test.beforeEach(async ({page})=>{
    await page.goto("https://playwright-qa.lovable.app/locators");
})

//runs after all the test completed
test.afterAll(async ({page})=>{
   await  page.close();
})



//Example-1 (Filter by using "hasText")
test("Verify Add to cart for Mouse", async ({ page }) => {

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

});

//Example-2 (.Count items not having "Out of stock" using "hasNotText")
// can use test.only to run only spesific test when you have multiple test in a single file 
test('"Count items not having "Out of stock"', async ({ page }) => {
    let inStock = page.getByRole('listitem').filter({hasNotText: "Out of stock"});

    //verify the count must be 2
    await expect(inStock).toHaveCount(2);

});

//Example-3 (Verify elements using data-testid)
test('Verify elements using data-testid', async ({ page }) => {

    //locate element using testif
    let primaryWidget = page.getByTestId('primary-widget');
    let secondaryWidget = page.getByTestId('secondary-widget');
    let tertiaryWidget = page.getByTestId('tertiary-widget');

    //verify the visibility
    await expect(primaryWidget).toBeVisible();
    await expect(secondaryWidget).toBeVisible();
    await expect(tertiaryWidget).toBeVisible();

    //verify the contains text

    await expect(primaryWidget).toContainText('Widget A');
    await expect(secondaryWidget).toContainText('Widget B');
    await expect(tertiaryWidget).toContainText('Widget C');

});


//========== first(), last(), nth()===============
//Example-5 (Count all elements with test ids) using css selector
test('Count all elements with test id', async ({ page }) => {

    let listOfElements = page.locator('[data-testid]'); //using css selector

    //retrive the values
    let firstElement = listOfElements.first();
    let lastElement = listOfElements.first();
    let spesificElement0 = listOfElements.nth(0);
    let spesificElement1 = listOfElements.nth(1);
    let spesificElement2 = listOfElements.nth(2);
 
    //priniting the values 
    console.log("➡️ first element is : ", await firstElement.innerText());
    console.log("➡️ last element is : ", await lastElement.innerText());
    console.log("➡️ specific nth(0) element is : ", await spesificElement0.innerText());
    console.log("➡️ specific nth(1) element is : ", await spesificElement1.innerText());
    console.log("➡️ specific nth(2) element is : ", await spesificElement2.innerText());

    //verify counts
    await expect(listOfElements).toHaveCount(4);
});