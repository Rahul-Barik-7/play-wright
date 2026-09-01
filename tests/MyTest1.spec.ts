import { test, expect } from "@playwright/test";
//Import the test and expect functions from Playwright's testing library so that we can write and verify tests.
//test is used to define a test case.
//expect is used for assertions.

//syntax of the test method

// test ("title", () => {
//     //step1
//     //step2
//     //step3
// })


/* 
🔗 Relationship Between async, await, and Promise

A simple way to remember it is:

       ASYNC FUNCTION
             ↓
      allows us to use
             ↓
           AWAIT
             ↓
       waits for a
             ↓
          PROMISE 
          
*/
// Fixture: A fixture is a pre-configured resource that Playwright Test automatically provides to a test. Examples include page, browser, context, and request. We access a fixture through the test function's parameters, commonly using object destructuring: async ({ page }) => {}.
// why page fixture - bcz we can do anythng in a page like we can launch the browser, we can add validaion  

test("Verify the page title", async ({ page }) => {
    //when we use await , you must specify async before arrow function
    //promise means - certain asynchronous operations return Promises like Resolved or rejected so we need o add await
    await page.goto("https://www.youtube.com/");
    let mytitle: string = await page.title();
    console.log("Title of this page : ", mytitle);
    await expect(page).toHaveTitle("YouTube")
})