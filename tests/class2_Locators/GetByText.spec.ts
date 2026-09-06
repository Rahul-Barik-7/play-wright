import {test, expect} from "@playwright/test"

test ("Playwright test - getByText", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    /* 
        1. getByText() is a Playwright locator used to find an element based on the visible text displayed on the webpage.
        2. Syntax : page.getByText("text")
        3. Use getByText() for messages, labels, headings, or other visible text, specially for non interactive elements(div, span, p etc)
    */

    let staticWebTableText = page.getByText('Learn Selenium');  //Exact String match
    //let staticWebTableText = page.getByText('Learn Selenium',{exact:true}); //Exact String match (default)
    //let staticWebTableText = page.getByText('Learn Selen',{exact:false}); //partially Match
    await expect(staticWebTableText).toBeVisible();
})
