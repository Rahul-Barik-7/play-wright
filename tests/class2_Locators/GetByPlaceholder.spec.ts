import {test, expect} from "@playwright/test"

test ("Playwright test - getByPlaceholder", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    /* 
        1. getByPlaceholder() is a Playwright locator used to find an input field using its placeholder text.
        2. syntax: page.getByPlaceholder("placeholder text")
        3. Use getByPlaceholder() when the input has a meaningful and unique placeholder.    
    */

    let namePlaceholder = page.getByPlaceholder("Enter Name");
    await expect(namePlaceholder).toBeVisible();

    await namePlaceholder.fill("Rahul Barik");
})