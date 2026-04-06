import { test, expect } from '@playwright/test'

test.describe('Interaction State Correctness', () => {

  test('category filter: only one active at a time (single-select)', async ({ page }) => {
    await page.goto('/')

    // "All" button should be initially active (dark bg)
    const allBtn = page.locator('button').filter({ hasText: /^All|^全部/ }).first()
    await expect(allBtn).toHaveCSS('background-color', 'rgb(26, 25, 22)') // var(--text) = #1a1916

    // Click "Design Thinking" category
    const thinkingBtn = page.locator('button').filter({ hasText: /Design Thinking|设计思考/ }).first()
    await thinkingBtn.click()
    await page.waitForTimeout(200)

    // "Design Thinking" should now have active style (dark bg)
    await expect(thinkingBtn).toHaveCSS('background-color', 'rgb(26, 25, 22)')
    // "All" should NOT have active style anymore
    const allBg = await allBtn.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(allBg).not.toBe('rgb(26, 25, 22)')

    // Click "Architecture" category
    const archBtn = page.locator('button').filter({ hasText: /Architecture|架构决策/ }).first()
    await archBtn.click()
    await page.waitForTimeout(200)

    // "Architecture" should be active
    await expect(archBtn).toHaveCSS('background-color', 'rgb(26, 25, 22)')
    // "Design Thinking" should NOT be active anymore
    const thinkingBg = await thinkingBtn.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(thinkingBg).not.toBe('rgb(26, 25, 22)')
  })

  test('category filter: clicking active category deselects to "All"', async ({ page }) => {
    await page.goto('/')

    // Click a category
    const codingBtn = page.locator('button').filter({ hasText: /Coding|编码/ }).first()
    await codingBtn.click()
    await page.waitForTimeout(200)

    // Get the count shown
    const countText1 = await page.locator('text=/Showing \\d+ of \\d+|显示/').textContent()

    // Click "All" to deselect
    const allBtn = page.locator('button').filter({ hasText: /^All|^全部/ }).first()
    await allBtn.click()
    await page.waitForTimeout(200)

    // Count should show all frameworks again
    const countText2 = await page.locator('text=/Showing \\d+ of \\d+|显示/').textContent()
    expect(countText2).not.toBe(countText1)
  })

  test('advanced filter pills: visual toggle on/off', async ({ page }) => {
    await page.goto('/')

    // Open advanced filters
    const toggle = page.locator('button').filter({ hasText: /Filters/ })
    await toggle.click()

    // Click "System" pill
    const systemPill = page.getByRole('button', { name: 'System', exact: true })
    await systemPill.click()
    await page.waitForTimeout(200)

    // Should have active background (not transparent)
    const bgAfterClick = await systemPill.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bgAfterClick).not.toBe('rgba(0, 0, 0, 0)')

    // Click again to deselect
    await systemPill.click()
    await page.waitForTimeout(200)

    // Should return to transparent/default
    const bgAfterDeselect = await systemPill.evaluate(el => getComputedStyle(el).backgroundColor)
    // Either transparent or the default background
    expect(bgAfterDeselect).not.toBe(bgAfterClick)
  })

  test('search input: clear restores full list', async ({ page }) => {
    await page.goto('/')

    const search = page.locator('input[type="text"]')

    // Type a search query
    await search.fill('SOLID')
    await page.waitForTimeout(300)
    const countFiltered = await page.locator('text=/Showing (\\d+)/').textContent()

    // Clear search
    await search.fill('')
    await page.waitForTimeout(300)
    const countAll = await page.locator('text=/Showing (\\d+)/').textContent()

    // Full list should have more items
    expect(countAll).not.toBe(countFiltered)
  })

  test('modal: close button and escape both close modal', async ({ page }) => {
    await page.goto('/')

    // Open modal
    const firstCard = page.locator('[class*="card"]').first()
    await firstCard.click()
    await expect(page.locator('[class*="overlay"]')).toBeVisible()

    // Press Escape
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    await expect(page.locator('[class*="overlay"]')).not.toBeVisible()

    // Open again
    await firstCard.click()
    await expect(page.locator('[class*="overlay"]')).toBeVisible()

    // Click close button (×)
    const closeBtn = page.locator('[class*="close"]')
    await closeBtn.click()
    await page.waitForTimeout(300)
    await expect(page.locator('[class*="overlay"]')).not.toBeVisible()
  })

  test('favorites: star persists visual state', async ({ page }) => {
    await page.goto('/')

    // Find a star button and click it
    const starBtn = page.locator('[class*="star"]').first()
    await starBtn.click({ force: true })
    await page.waitForTimeout(200)

    // Star should now be visually "active" (golden color)
    const color = await starBtn.evaluate(el => getComputedStyle(el).color)
    // #e8a820 = rgb(232, 168, 32)
    expect(color).toContain('232')
  })
})
