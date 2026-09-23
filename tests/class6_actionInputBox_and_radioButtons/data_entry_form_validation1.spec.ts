import { test, expect } from "@playwright/test"

const dataEntryFormUrl: string = "https://sdetqa.vercel.app/autoplay";

test.describe("Data entry form validation", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(dataEntryFormUrl);
        //await expect(page.getByText("AutoPlay")).toBeVisible();
    });

    // test.afterEach(async ({ page }) => {
    //     await page.close();
    // });

    //1. page load validation
    test("1. Page load validation", async ({ page }) => {

        //Open the URL https://sdetqa.vercel.app/autoplay.html Page should load successfully
        await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay");

        //Verify text "AutoPlay" is visible
        await expect(page.getByText("AutoPlay")).toBeVisible();
    });

    //2. Input Fields Validation
    test("2. Input Fields Validation", async ({ page }) => {
        //locating all element
        const full_name_text_filed = page.getByLabel("Full name");
        const email_text_filed = page.getByLabel("Email");
        const phone_text_filed = page.getByLabel("Phone");  
        const address_text_area = page.getByLabel("Address");

        //Full name Field should be visible & enabled
        await expect(full_name_text_filed).toBeVisible();
        await expect(full_name_text_filed).toBeEnabled();
        //Check maxlength attribute of Full name should be 15
        await expect(full_name_text_filed).toHaveAttribute('maxlength','15');
        //Enter "John Canedy" in Full name
        await full_name_text_filed.fill("John Canedy");
        //Value should be entered correctly
        await expect(full_name_text_filed).toHaveValue("John Canedy");

        //Locate Email field & Field should be visible
        await expect(email_text_filed).toBeVisible();
        //Enter "rahulbarik481@gmail.com" Value should match input
        await email_text_filed.fill("rahulbarik481@gmail.com");
        await expect(email_text_filed).toHaveValue("rahulbarik481@gmail.com");

        //Locate phone field & Field should be visible
        await expect(phone_text_filed).toBeVisible();
        //Enter "9898987878" Value should match input
        await phone_text_filed.fill("9898987878");
        await expect(phone_text_filed).toHaveValue("9898987878");

        //Locate address field & Field should be visible
        await expect(address_text_area).toBeVisible();
        //Enter multi-line address & Value should accept newline input
        await address_text_area.fill("Bhubaneswar, \n Odisha, India");
        await expect(address_text_area).toHaveValue("Bhubaneswar, \n Odisha, India");

        //page.waitForTimeout(2000);

    });

    test("3. Radio Button validation", async({page})=>{
        //locating element
        const maleRadioButton = page.getByLabel("Male", {exact: true});
        const femaleRadioButton = page.getByLabel("Female", {exact: true});
        //Button should be visible
        await expect(maleRadioButton).toBeVisible();
        await expect(femaleRadioButton).toBeVisible();

        //selecting male radio button
        await maleRadioButton.check();

        //verify male radio button should be cheked and female should not be checked
        await expect(maleRadioButton).toBeChecked();
        await expect(femaleRadioButton).not.toBeChecked();
    })
});

