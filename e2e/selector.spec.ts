import { test, expect } from '@playwright/test'

test.describe('Framework Selector', () => {
  test('selector filters narrow results', async ({ page }) => {
    await page.goto('/selector')
    await expect(page.locator('h1')).toBeVisible()
    // Click a category chip to filter
    const chip = page.locator('[class*="chip"]').first()
    await chip.click()
    // Result count should be visible in the banner
    const count = page.locator('[class*="resultCount"]')
    await expect(count).toBeVisible()
    // Reset button should appear
    await expect(page.locator('button').filter({ hasText: /Start Over|重新开始/ })).toBeVisible()
  })

  test('selector shows result count', async ({ page }) => {
    await page.goto('/selector')
    // Live result count in banner
    const count = page.locator('[class*="resultCount"]')
    await expect(count).toBeVisible()
  })
})
