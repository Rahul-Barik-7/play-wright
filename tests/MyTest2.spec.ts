import { test, expect } from "@playwright/test"

test("Verify url of the page", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    let myUrl: string = await page.url();
    console.log("Url: ", myUrl);
    await expect(page).toHaveURL(/testautomationpractice/);
})