import {test, expect} from "@playwright/test"

test ("Playwright test - getByLabel", async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/register")

    /* 
        1. getByLabel() is a Playwright locator used to find a form field using its associated label.
        2. syntax: page.getByLabel("label text")
        3. It is especially useful for form fields: input form like username text field , password text field
    
    */

    let nameLabel = page.getByLabel("First name:");
    await expect(nameLabel).toBeVisible();

    //filling the name field
    await nameLabel.fill("Rahul");
})