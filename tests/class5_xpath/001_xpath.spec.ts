import { test, expect } from "@playwright/test";

const url: string = "https://demowebshop.tricentis.com/";

test.describe("playwright xpath", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    })

    test.afterEach(async ({ page }) => {
        await page.close();
    })


    test("absolute xpath", async ({ page }) => {

        //(1) Absolute xpath(full path)- not recomended
        //in this we have to navigate from the room node like /html/body/div/a like this
        let logo = page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a/img");
        await expect(logo).toBeVisible();

        //(2) Relative xpath(partial path)- with single element
        //in relative xpath we will directly jump to that elemenet wherever it present
        //syntax: //tagname[@attribute=value] - very common example
        let demoWebShopLogo = page.locator('//img[@alt="Tricentis Demo Web Shop"]');
        await expect(demoWebShopLogo).toBeVisible();
        
        //(3) xpath with contains()
        let products = page.locator('//h2//a[contains(@href, "computer")]');
        console.log("Products are: ",await products.allInnerTexts());
        let productCount = await products.count();
        console.log("Product count is: ", productCount);
        expect(productCount).toBe(4); //it is not dealing with any service in the backend so await is not required & it is not returing any promise
        expect(productCount).toBeGreaterThan(2);  //it is not dealing with any service in the backend so await is not required & it is not returing any promise

        /* 
            for (const eachProduct of await products.all()) {
                console.log(await eachProduct.textContent());
            } 
            or you can use below single statement
        */
        console.log(await products.nth(1).textContent()); 
        console.log(await products.allTextContents()); 

        //await products.click();  //strict mode voilation- it means trying to perform single action for group of element

        await products.nth(2).click();

        //navigate back to the previous page
        await page.goBack();

        //(4) xpath with starts-with()
        let buildingProduct = page.locator('//h2//a[starts-with(@href,"/build")]');
        let buildingProductCount = await buildingProduct.count();
        console.log("building product count is: ", await buildingProduct.count());
        expect(buildingProductCount).toBe(3);
        expect(buildingProductCount).toBeGreaterThan(2);

        //(5) xpath with text()
        const regLink = page.locator("//a[text()='Register']");
        await expect(regLink).toBeVisible();
        await regLink.click();

        //(6) xpath with last() 
        const wishList= page.locator('//div[@class="column my-account"]//li[last()]');
        expect(await wishList.innerText()).toBe("Wishlist");

        //(7) xpath with position() ordering number this is not index
        const ordersText= page.locator(' //div[@class="column follow-us"]//li[position()=5]').textContent();
        console.log(await ordersText);
        expect(await ordersText).toBe("Google+");
        
    })



})