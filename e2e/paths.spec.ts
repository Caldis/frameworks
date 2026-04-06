import { test, expect } from '@playwright/test'

test.describe('Learning Paths', () => {
  test('paths page shows 5 learning paths', async ({ page }) => {
    await page.goto('/paths')
    await expect(page.locator('h1')).toBeVisible()
    const cards = page.locator('[class*="pathCard"]')
    await expect(cards).toHaveCount(5)
  })

  test('clicking a path expands step list', async ({ page }) => {
    await page.goto('/paths')
    const firstCard = page.locator('[class*="pathCard"]').first()
    await firstCard.click()
    // Steps should be visible
    await expect(page.locator('[class*="stepItem"]').first()).toBeVisible()
  })
})
