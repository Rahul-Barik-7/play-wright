import { test, expect } from "@playwright/test"

const url: string = "https://sdetqa.vercel.app/autoplay";

test.describe("Handling JQuery related single select dropdowns", async () => {
    test.beforeEach(async ({ page }) => {
        //Launch the URL Page should load successfully 
        await page.goto(url);
        await expect(page.getByText("AutoPlay")).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });


    test("1. Test Cases_Single Select Dropdown (Country)", async ({ page }) => {

        //Locate Country dropdown Dropdown should be visible
        const countryDropdown = page.locator("#country");
        await expect(countryDropdown).toBeVisible();

        //Get default selected value Default should be India (india)
        await expect(countryDropdown).toHaveValue("india");

        //Select option using label "USA" Value should change to usa
        //3 ways to select dropdown
        //3.1 using lable
        //3.2 using attributes (if available in DOM)
        //3.3 uisng index


        //selectOption();
        //In Playwright, the locator.selectOption() method is used to select one or multiple options within a native <select> element.

        //select by visible labels
        await countryDropdown.selectOption({ label: "Germany" });
        //await countryDropdown.selectOption('Germany'); //this
        await expect(countryDropdown).toHaveValue("germany");

        //select by visible values 
        await countryDropdown.selectOption({ value: "france" });
        await expect(countryDropdown).toContainText("France");

        //select by index 
        await countryDropdown.selectOption({ index: 1 });
        await expect(countryDropdown).toHaveValue("usa");

        //select by combination of value and labels
        await countryDropdown.selectOption({ label: "Germany", value: "germany" })
        await expect(countryDropdown).toHaveValue("germany");

        //validate dropdown option count
        const options = countryDropdown.locator("option");  //locator chaining
        expect(options).toHaveCount(5);
        console.log("options list : ", await options.allInnerTexts());

        const optionsList = page.locator("#country option");
        await expect(optionsList).toHaveCount(5);
        console.log("options list : ", await optionsList.allInnerTexts());
        console.log("count is : ", await optionsList.count());

        //Get all option texts List should contain "Germany"
        const optionText = await optionsList.allInnerTexts();
        expect(optionText).toContain("France");

        //print all option text using for loop
        for (const texts of optionText) {
            console.log(texts);
        }
    })


    test("2. Test Cases_Multi Select Dropdown (Colors)", async ({ page }) => {

        //Locate Colors dropdown Dropdown should be visible
        const multiSelectDropdown = page.locator("#colors");
        await expect(multiSelectDropdown).toBeVisible();

        //the initial default selected value should be blue
        await expect(multiSelectDropdown).toHaveValue('blue');

        //Select multiple options using labels (Red, Green, Yellow) All should be selected
        await multiSelectDropdown.selectOption([{ label: 'Yellow' }, { index: 1 }, { value: 'red' }]);
        await page.waitForTimeout(2000);
        //Verify multiple selections Selected values should match input
        await expect(multiSelectDropdown).toHaveValues(['red', 'blue', 'yellow']);
    })

    test("3. Test Cases Sorted Dropdown Validation", async ({ page }) => {
        //Locate sorted dropdown options Options should be visible

        //const dropdownOptions = page.locator("#colors option"); // this will return all options present in this dropdown // unsorted list
        const dropdownOptions = page.locator("#sorted option"); // this will return all options present in this dropdown //sorted list

        //original array
        const OriginalOptionText: string[] = await dropdownOptions.allInnerTexts();
        console.log("Option text present in dropdown: ", OriginalOptionText);

        //copy array
        // const copyOriginalList: string[] = OriginalOptionText //creating a copy of optionText(original array)
        // console.log("Copy of Original List: ", copyOriginalList);

        const copyArray = [];
        for (const copy of OriginalOptionText) {
            copyArray.push(copy);
        }
        console.log("copy array: ", copyArray);

        const sortcopy = copyArray.sort();

        //sorting the array
        // const sortedListOfCopy: string[] = [...copyOriginalList].sort();  // using Spread Operator (it will only sort the copy array not original array)

        console.log("Original list after sort", OriginalOptionText);
        console.log("sorted List: ", sortcopy);

        //validation 
        expect(OriginalOptionText).toEqual(sortcopy);
        
    })
});