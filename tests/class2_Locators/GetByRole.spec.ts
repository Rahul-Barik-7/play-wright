import {test ,expect} from "@playwright/test"

test ("playwright Locators", async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/")

    /* 
        1. getByRole() is a Playwright locator used to find an element on a web page based on its accessible role and, optionally, its visible name.
        2. Syntax : page.getByRole("role", { name: "element name" })
        3. Use getByRole() when you want to interact with common user-facing UI elements, such as: (button, heading, checkbox, link etc)

    */

    const pageLink = page.getByRole('link',{name:'Data Entry Form'});
    await expect(pageLink).toBeVisible();
    
    const dynamicButton = page.getByRole('button',{name:'START'});
    await expect(dynamicButton).toBeVisible();
    //clicking Dynamic button
    await dynamicButton.click();

});