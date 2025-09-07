import { expect, test } from "@playwright/test"



test("Search Product", async ({ page }) => {
    await page.goto("https://www.automationexercise.com/");
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: ' Signup / Login' }).click()
    await expect(page.locator('#form')).toContainText('Login to your account')
    await page.locator('form').filter({ hasText: 'login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'login' }).getByPlaceholder('Email Address').first().fill('Rishabh1611@gmail.com')
    await page.locator('[name="password"]').fill('test1234')
    await page.getByRole('button', { name: 'Login' }).click();
    const username = 'Rishabh';
    await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();
    console.log("⚠️ Login Successfull ✨")
    await page.getByRole('link', { name: 'Products' }).click();
    await page.getByPlaceholder('Search Product').click();
    await page.getByPlaceholder('Search Product').fill('Blue');
    await page.locator("#submit_search").click();
    const blueProducts = page.locator('div.productinfo p', { hasText: /Blue/i });
    const count = await blueProducts.count();
    let productName;
    console.log(`Total number of blue products: ${count}`);
    for (let i = 0; i < count; i++) {
        const name = await blueProducts.nth(i).textContent();
        console.log(`Blue product ${i + 1}: ${name}`);
        // Check if the product name matches "Blue Top"
        // Using trim() to avoid any leading/trailing whitespace issues
        if (name && name.trim() === "Blue Top") {
            console.log("Blue Top is present in the search results");
            productName = name;
            const card = blueProducts.nth(i).locator('..').locator('..').locator('..');
            await card.locator('a', { hasText: 'View Product' }).click();
            await page.getByRole('button', { name: 'Add to cart' }).click();
            console.log("⚠️ Product Added to Cart ✨");
            break;
        }
    }
    console.log(`⚠️ Product Search Successfull ✨-- ${productName}`)
},60000);