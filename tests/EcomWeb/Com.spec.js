import { expect, test } from "@playwright/test"

test("Signup", async ({ page }) => {
    await page.goto("https://www.automationexercise.com/",{ waitUntil: "domcontentloaded" },{ timeout: 120000 });
    await page.getByRole('link', { name: ' Signup / Login' }).click()
    await expect(page.locator('#form')).toContainText('New User Signup!');
    await page.getByRole('textbox', { name: "Name" }).click()
    await page.getByRole('textbox', { name: "Name" }).fill('Rishabh')
    await page.locator('[name="email"]').last().fill('Rishabh1616@gmail.com')
    await page.getByRole('button', { name: 'Signup' }).click();
    if (await page.getByText('Email Address already exist!').isVisible()) {
        console.log("⚠️ Email Address already exist! Enter New User ✨")
    }
    else {
        await expect(page.getByText('Enter Account Information')).toContainText('Enter Account Information');
        await page.locator('[for="id_gender1"]').check()
        await expect(page.getByRole('textbox', { name: 'Name *', exact: true })).toHaveValue('Rishabh');
        await expect(page.getByRole('textbox', { name: 'Email *' })).toHaveValue('Rishabh1616@gmail.com');
        await page.getByRole('textbox', { name: 'Password *' }).click();
        await page.getByRole('textbox', { name: 'Password *' }).fill('test1234');
        await expect(page.getByText('Date of Birth')).toBeVisible();
        await page.locator('#days').selectOption('16')
        await page.locator('#months').selectOption('8')
        await page.locator('#years').selectOption('1996')
        //     await Promise.all([
        //   page.locator('#days').selectOption('16'),
        //   page.locator('#months').selectOption('8'),
        //   page.locator('#years').selectOption('1996')
        // ]);
        await page.locator('#newsletter').check();
        await page.locator('#optin').check();
        await page.locator('#first_name').click();
        await page.locator('#first_name').fill('Rishabh');;
        await page.getByRole('textbox', { name: 'Last name' }).fill('saini');
        await page.getByRole('textbox', { name: 'Company', exact: true }).fill('INFO PVT');
        await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
        await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('New Delhi,India 26384');
        await page.getByRole('textbox', { name: 'Address 2' }).click();
        await page.getByRole('textbox', { name: 'Address 2' }).fill('New Delhi');
        await page.getByLabel('Country *').selectOption('Singapore');
        await page.getByRole('textbox', { name: 'State *' }).fill('Uttrakhand');
        await page.locator('[id="city"]').fill("Dehradun")
        await page.locator('[id="zipcode"]').fill("12312312")
        await page.locator('[id="mobile_number"]').fill("7983434213")
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Account Created! Congratulations! Your new account has been successfully')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
        console.log("⚠️ Registration Successfull !!✨")
    }
}, 180000);

test("Search Product", async ({ page }) => {
    await page.goto("https://www.automationexercise.com/",{ waitUntil: "domcontentloaded" },{ timeout: 120000 });
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

},180000);