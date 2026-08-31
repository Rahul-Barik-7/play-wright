import {test,expect} from "@playwright/test";
//Import the test and expect functions from Playwright's testing library so that we can write and verify tests.

//syntax of the test method

// test ("title", () => {
//     //step1
//     //step2
//     //step3
// })

// fixture - is a global varibale provided by playwright (like : page, browser)
// why page fixture - bcz we can do anythng in a page like we can launch the browser, we can add validaion  

test ("Verify the page title", async ({page})=>{
    //when we use await , you must specify async before arrow function
    //promise means - every statement return a promise like Resolved or rejected so we need o add await
    await page.goto("https://www.youtube.com/");
    let mytitle: string = await page.title();
    console.log("Title: ",mytitle);
    await expect(page).toHaveTitle("YouTube")
})