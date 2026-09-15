import {test, expect} from "@playwright/test"

test ("Playwright test - getByAltText", async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")

    /* 
        1. getByAltText() is a Playwright locator used to find an image or other element using its alt attribute.
        2. syntax: page.getByAltText("alt text")
        3. Mainly use getByAltText() for images that have meaningful alt text.
    */

    //single assertion statement without creating a varibale
    await expect(page.getByAltText('Tricentis Demo Web Shop')).toBeVisible();

})