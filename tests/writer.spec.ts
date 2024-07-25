import { test, expect, request } from '@playwright/test';

//Visit the writer page before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://writer.com/');
});

test('Assert page title and avigate to careers', async ({ page }) => {  
    // Expect the correct page to load with a title
    await expect(page).toHaveTitle(/Writer/);

    // Click the careers link
    await page.getByRole('link', { name: 'Careers' }).click(); 

    // Assert correct page loads
    await expect(page.getByRole('link', { name: 'Open positions' })).toBeVisible();
  });

  test('API test for sign in without auth', async({ page, request }) => {

    // Click the login button
    await page.getByText('Sign in').click();

    // Assert the permissions api request to be unauthorized
    const url = 'https://app.writer.com/api/auth/permission'
    const loginResponse = await request.get(url)
    expect (loginResponse.status()).toBe(401)
  })

