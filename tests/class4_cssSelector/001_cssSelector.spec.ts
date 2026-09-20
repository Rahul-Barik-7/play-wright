import { test, expect } from "@playwright/test";

//common url for all the test present in this file 
const url: string = "https://demowebshop.tricentis.com/";

//in playwright we can use test suite using describe block
test.describe("Css locator Demo", () => {


    //using beoforeEach() for common url
    test.beforeEach(async ({ page }) => {
        page.goto(url);
    })

    //using afterEach() to for all close() methods used in all tests
    test.afterEach(async ({ page }) => {
        await page.close();
    })

    test("css selector with id", async ({ page }) => {

        //tag#id    OR    #id
        let searchInput1 = page.locator("input#small-searchterms") //using tag#id 
        await expect(searchInput1).toBeVisible();
        await searchInput1.fill("laptop");

        //tag[attribute=value]   OR   [attribute=value]
        let searchButton1 = page.locator('[value="Search"]');
        await searchButton1.click();
        //await page.locator('[value="Search"]').click(); can use single line also 
        await expect(page.locator('h2[class="product-title"]>a')).toHaveText("14.1-inch Laptop");
        //await page.close();
    });


    test("css selector with class", async ({ page }) => {

        //tag.class    OR    .class
        let searchInput2 = page.locator("input.search-box-text") //using tag.class
        await expect(searchInput2).toBeVisible();
        await searchInput2.fill("laptop");

        //tag[attribute=value]   OR   [attribute=value]
        let searchButton2 = page.locator('[value="Search"]');
        await searchButton2.click();
        //await page.locator('[value="Search"]').click(); can use single line also
        await page.waitForTimeout(5000);//manual wait
        await expect(page.locator('h2[class="product-title"]>a')).toHaveText("14.1-inch Laptop");
        //await page.close();
    });


    test("css with attribute", async ({ page }) => {

        let searchInput3 = page.locator('input[type="text"][value="Search store"]')
        await expect(searchInput3).toBeVisible();
        await searchInput3.fill("laptop");

        //tag[attribute=value]   OR   [attribute=value]
        let searchButton3 = page.locator('[value="Search"]');
        await searchButton3.click();
        //await page.locator('[value="Search"]').click(); can use single line also
        await page.waitForTimeout(5000);//manual wait
        await expect(page.locator('h2[class="product-title"]>a')).toHaveText("14.1-inch Laptop");
        //await page.close();
    })

    test("css class with attribute", async ({ page }) => {

        let searchInput4 = page.locator('.search-box-text[value="Search store"]') //css class with attribute
        await expect(searchInput4).toBeVisible();
        await searchInput4.fill("laptop");

        //tag[attribute=value]   OR   [attribute=value]
        let searchButton4 = page.locator('[value="Search"]');
        await searchButton4.click();
        //await page.locator('[value="Search"]').click(); can use single line also
        await page.waitForTimeout(5000);//manual wait
        await expect(page.locator('h2[class="product-title"]>a')).toHaveText("14.1-inch Laptop");
        //await page.close();
    });

});
