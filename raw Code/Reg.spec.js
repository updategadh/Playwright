import { expect, test } from "@playwright/test"
import { time } from "console";

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