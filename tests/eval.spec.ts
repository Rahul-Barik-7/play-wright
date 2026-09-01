import {test,expect} from "@playwright/test"

test("Verify page title", async ({page})=> {
    await page.goto("https://customerdelight.evalcbt.com/login");
    let loginTitle = await page.title();
    console.log("Login Page Title is: ",loginTitle);
    await expect(page).toHaveTitle("Login to eVal Online Assessment");

})