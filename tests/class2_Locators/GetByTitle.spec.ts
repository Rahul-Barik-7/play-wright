import {test, expect} from "@playwright/test"

test ("Playwright test - getBytitle", async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")

    /* 
        1. getByTitle() is a Playwright locator used to find an element using its title attribute.
        2. syntax: page.getByTitle("title text")
        3. It's useful when an element has a meaningful title attribute, especially for icons, buttons, links, and tooltips.
    */

    let title1 = await page.getByTitle("Show details for $25 Virtual Gift Card").first(); //using 1st because i have duplicate title , can use parent ref or nth(0)
    await expect(title1).toBeVisible();

})