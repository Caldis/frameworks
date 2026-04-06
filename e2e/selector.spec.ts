import { test, expect } from '@playwright/test'

test.describe('Framework Selector', () => {
  test('selector wizard narrows results', async ({ page }) => {
    await page.goto('/selector')
    await expect(page.locator('h1')).toBeVisible()
    // Step 1: click a category option
    const firstOption = page.locator('[class*="option"]').first()
    await firstOption.click()
    // Click Next
    const nextBtn = page.locator('button').filter({ hasText: /Next|下一步/ })
    await nextBtn.click()
    // Should be on step 2
    await expect(page.locator('text=/Step 2|第 2 步/')).toBeVisible()
  })

  test('selector shows results count', async ({ page }) => {
    await page.goto('/selector')
    // Results count should show total initially (in the results panel)
    await expect(page.locator('[class*="resultsCount"]')).toBeVisible()
    const text = await page.locator('[class*="resultsCount"]').textContent()
    expect(text).toMatch(/\d+ frameworks match|\d+ 个框架符合/)
  })
})
