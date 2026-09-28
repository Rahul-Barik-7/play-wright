import { test, expect, errors } from "@playwright/test"

const dataEntryFormUrl: string = "https://sdetqa.vercel.app/autoplay";

test.describe("Data entry form validation", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(dataEntryFormUrl);
        //await expect(page.getByText("AutoPlay")).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

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
        await expect(full_name_text_filed).toHaveAttribute('maxlength', '15');
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

    //3. Radio Button validation
    test("3. Radio Button validation", async ({ page }) => {
        //locating element
        const maleRadioButton = page.getByLabel("Male", { exact: true });
        const femaleRadioButton = page.getByLabel("Female", { exact: true });
        //Button should be visible
        await expect(maleRadioButton).toBeVisible();
        await expect(femaleRadioButton).toBeVisible();

        //selecting male radio button
        await maleRadioButton.check();

        //verify male radio button should be cheked and female should not be checked
        await expect(maleRadioButton).toBeChecked();
        await expect(femaleRadioButton).not.toBeChecked();
    })


    //Checkbox (Days) Validation
    test("Checkbox (Days) Validation", async ({ page }) => {
        const sundayCheckBox = page.getByLabel("Sun", { exact: true });
        //sundayCheckBox.check();
        sundayCheckBox.setChecked(true); // this will work same as check()
        await expect(sundayCheckBox).toBeChecked();

        //Select all checkboxes (Mon–Sun)
        //All should be checked

        const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


        //with map()
        //creating a map which will reurn all the locators of getByLabel()
        const allCheckBoxes = allDays.map((days) => {
            return page.getByLabel(days);
        })

        //using for loop to check all the chekboxes
        // for(const checkboxes of allCheckBoxes){
        //     await checkboxes.check();
        //     await expect(checkboxes).toBeChecked();
        // } 


        //without using map()
        /* 
        for (const checkday of allDays) {
            const days = page.getByLabel(checkday);
            await days.check();
            await expect(days).toBeChecked();
        }
        await page.waitForTimeout(2000);
        */

        // Uncheck last 3 (Fri, Sat, Sun)
        /* 
        for (const uncheckday of ['Sun', 'Sat', 'Fri']) {
            const days = page.getByLabel(uncheckday);
            await days.uncheck();
            await expect(days).not.toBeChecked();
        }
        await page.waitForTimeout(2000);
        */

        //Toggle all checkboxes Checked → unchecked, unchecked → checked
        /* 
        for(const checkUncheck of allDays) {
            const checkbox = page.getByLabel(checkUncheck);
            if(await checkbox.isChecked()){
                await checkbox.uncheck();
            }
            else{
                await checkbox.check();
            }
        }
        await page.waitForTimeout(2000);
        */

        //Select checkboxes using index (1,3,6 → Tue, Thu, Sun) and Only those indexes should be checked
        const checkboxindexs: number[] = [0, 1, 2];
        for (const indexes of checkboxindexs) {
            await allCheckBoxes[indexes].check();   //using allCheckBoxes from map() which is having all the checkboxs getByLabel() and then extracting only selected indexes
            await expect(allCheckBoxes[indexes]).toBeChecked();
        }
    });

    //submit button validation
    test("5. Submit button Validation", async ({ page }) => {
        const submitButton = page.getByRole('button', { name: "Submit" }).first();
        await expect(submitButton).toBeVisible();
        await submitButton.click();
        await expect(submitButton).toBeEnabled();
    })


    //fiedl level functional validation
    test("6. fiedl level functional validation", async ({ page }) => {
        const full_name_text_filed = page.getByLabel("Full name");
        const email_text_filed = page.getByLabel("Email");
        const phone_text_filed = page.getByLabel("Phone");
        const address_text_area = page.getByLabel("Address");
        const submitButton = page.getByRole('button', { name: "Submit" }).first();

        let errorMessage = page.locator("#formErrors");

        //leave all the field empty and click on submit button and then check the error message shoudl be displayed
        await full_name_text_filed.clear();
        await email_text_filed.clear();
        await phone_text_filed.clear();
        await address_text_area.clear();

        await submitButton.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText("Please fix the following:");
    });

    //Enter invalid email format Error should be shown
    test("7. Email validation", async ({ page }) => {
        const email_text_filed = page.getByLabel("Email");
        let errorMessage = page.locator("#formErrors");
        const submitButton = page.getByRole('button', { name: "Submit" }).first();

        await email_text_filed.fill("abcd.com");
        await submitButton.click();
        
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText("Please enter a valid email address.");
    
    })


    //Enter more than 15 chars in name Input should be restricted
    test("7. Enter more than 15 chars in name Input should be restricted", async ({ page }) => {
        const full_name_text_filed = page.getByLabel("Full name");
        await full_name_text_filed.fill("ABCD123456789ABXYZ");

        //await expect(full_name_text_filed).toHaveValue("ABCD123456789AB");
        await expect(full_name_text_filed).toHaveValue(/.{15}/) ///using regular expression

    })

    //Enter alphabets in phone field Should be restricted (if validation exists)
    test("8. Enter alphabets in phone field Should be restricted (if validation exists)", async ({ page }) => {
        
        const phone_text_filed = page.getByLabel("Phone");
        await phone_text_filed.fill("123ABCDABXYZ456");

        await expect(phone_text_filed).toHaveValue(/^[^A-Za-z]*$/) ///using regular expression
        
    })
    //Regular expresion
/*
1. / ... /
These are just delimiters used in many languages (like JavaScript) to define a regex.

2. ^ (Start anchor) : Ensures the match starts from the beginning of the string

3. [^A-Za-z]
This is a negated character class
A-Za-z → all uppercase and lowercase English letters
[^A-Za-z] → anything that is NOT a letter

✅ Matches:

Digits (0-9)
Symbols (@ # $ %)
Spaces
Special characters

❌ Does NOT match:

A–Z
a–z

*/

});

