import { expect, test } from "@playwright/test"
test("Login", async ({ page }) => {
    await page.goto("https://www.automationexercise.com");
    await page.getByRole('link', { name: ' Signup / Login' }).click()
    await expect(page.locator('#form')).toContainText('Login to your account')
    await page.locator('form').filter({ hasText: 'login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'login' }).getByPlaceholder('Email Address').first().fill('Rishabh1611@gmail.com')
    await page.locator('[name="password"]').fill('test1234')
    await page.getByRole('button', { name: 'Login' }).click();
    const username = 'Rishabh'; 
    await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();
    console.log("⚠️ Login Successfull ✨")
}); 