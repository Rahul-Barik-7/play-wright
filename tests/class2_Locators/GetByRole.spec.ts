import {test ,expect} from "@playwright/test"

test ("Playwright test - getByRole", async ({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/")

    /* 
        1. getByRole() is a Playwright locator used to find an element on a web page based on its accessible role and, optionally, its visible name.
        2. Syntax : page.getByRole("role", { name: "element name" })
        3. getByRole()  is prefferable for actionable items like button, checkbox, radio

    */

    const pageLink = page.getByRole('link',{name:'Data Entry Form'});
    await expect(pageLink).toBeVisible();

    const newTabButton = page.getByRole("button", {name: 'New Tab'});
    await expect(newTabButton).toBeVisible();
    
    const dynamicButton = page.getByRole('button',{name:'START'});
    await expect(dynamicButton).toBeVisible();
    //clicking Dynamic button
    await dynamicButton.click();

});