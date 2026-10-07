import { test, expect } from "@playwright/test";

test("Product sort and print lowest/highest price with names", async ({ page }) => {
    await page.goto("https://www.bstackdemo.com/"); //Navigate to the Webpage
    const logo = page.getByRole('img', { name: 'logo' }) //capture the logo
    await expect(logo).toBeVisible(); //The webpage should load successfully

    const orderByDropdown = page.locator("div.sort>select"); //Locate the "Order by" dropdown
    await expect(orderByDropdown).toBeVisible(); //Verify the dropdown is Visible
    await expect(orderByDropdown).toBeEnabled(); //Verify the dropdown is enabled

    await orderByDropdown.selectOption({ value: 'lowestprice' }); //Select the option "Lowest to highest"

    // Wait for sorting to reflect
    await page.waitForTimeout(3000);

    const productsNames = page.locator('p.shelf-item__title');
    const productsPrices = page.locator('div.val');

    const pnames = await productsNames.allInnerTexts();
    const pprices = await productsPrices.allInnerTexts();

    //console.log("Products Names: ", pnames);
    //console.log("Products Prices: ", pprices);

    expect(pnames.length).toBe(pprices.length); //name count should be same as price counts
    console.log('Printing Product Names along with their Prices.......');
    for (let i in pnames) {
        console.log(`${pnames[i]} -->> ${pprices[i]}`)
    }

    /* console.log('Printing Product Names along with their Prices.......');
    for (let i = 0; i < pnames.length; i++) {
        console.log(`${pnames[i]} : ${pprices[i]}`);
    } */

    console.log(`Lowest Priced Product: ${pnames[0]} -->> ${pprices[0]}`);
    console.log(`Highest Priced Product: ${pnames[pnames.length - 1]} -->> ${pprices[pprices.length - 1]}`);
    await page.close();
})