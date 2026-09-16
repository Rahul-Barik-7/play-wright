import {test, expect} from "@playwright/test"

test ("Playwright test - getBytitle", async ({page})=>{
    await page.goto("https://www.amazon.in/")

    /* 
        1. getByTitle() is a Playwright locator used to find an element using its title attribute.
        2. syntax: page.getByTitle("title text")
        3. It's useful when an element has a meaningful title attribute, especially for icons, buttons, links, and tooltips.
    */

    let searchTitle = await page.getByTitle("Search in"); //using 1st because i have duplicate title , can use parent ref or nth(0)
    await expect(searchTitle).toBeVisible();
    //await expect(searchTitle).toHaveText("Alexa Skills"); //if expected and received count is same 
    await expect(searchTitle).toContainText("Alexa Skills"); //some portion of text present in webpage

});