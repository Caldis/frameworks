import { test, expect } from '@playwright/test'

test.describe('SDFrame Smoke Tests', () => {
  test('homepage loads with framework cards', async ({ page }) => {
    await page.goto('/')
    // Title visible
    await expect(page.locator('h1')).toBeVisible()
    // Cards render (CSS modules hash the class name, but the card div still contains the class fragment "card")
    const cards = page.locator('[class*="card"]')
    await expect(cards.first()).toBeVisible()
    // Count display shows "Showing X of Y"
    await expect(page.locator('text=/Showing \\d+ of \\d+/')).toBeVisible()
  })

  test('search filters frameworks', async ({ page }) => {
    await page.goto('/')
    const searchInput = page.locator('input[type="text"]')
    await searchInput.fill('SOLID')
    // Should show filtered results containing SOLID (card grid, not autocomplete)
    await expect(page.locator('[class*="card"]').filter({ hasText: 'SOLID' }).first()).toBeVisible()
    // Count should show a smaller number
    await expect(page.locator('text=/Showing \\d+ of \\d+/')).toBeVisible()
  })

  test('category filter works', async ({ page }) => {
    await page.goto('/')
    // Click a category button - "Design Thinking" is the first category
    const filterButton = page.locator('button').filter({ hasText: 'Design Thinking' })
    await filterButton.first().click()
    // Count should update
    await expect(page.locator('text=/Showing \\d+ of \\d+/')).toBeVisible()
  })

  test('framework detail page loads', async ({ page }) => {
    await page.goto('/frameworks/solid-principles')
    // Should show framework name in heading
    await expect(page.locator('h1')).toContainText(/SOLID/)
    // Should have "How It Works" section with implementation steps
    await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible()
  })

  test('category page loads', async ({ page }) => {
    await page.goto('/category/thinking')
    // Should show category name in heading
    await expect(page.locator('h1')).toContainText(/Design Thinking/)
    // Should show framework cards
    const cards = page.locator('[class*="card"]')
    await expect(cards.first()).toBeVisible()
  })

  test('map page loads', async ({ page }) => {
    await page.goto('/map')
    // Should show SVG element (d3 force graph)
    await expect(page.locator('svg').first()).toBeVisible({ timeout: 10000 })
    // Should show page title
    await expect(page.locator('h1')).toContainText(/Map/)
  })

  test('language switcher works', async ({ page }) => {
    await page.goto('/')
    // Verify English text is showing initially
    await expect(page.locator('text=Showing')).toBeVisible()
    // Find and click the language switcher button
    const switcher = page.locator('button').filter({ hasText: /EN.*中/ })
    await switcher.click()
    // After switching to Chinese, "Showing" should disappear and Chinese text should appear
    await expect(page.locator('text=/显示/')).toBeVisible({ timeout: 3000 })
  })

  test('advanced filters toggle and work', async ({ page }) => {
    await page.goto('/')
    // Click "Filters" toggle button
    const toggle = page.locator('button').filter({ hasText: /Filters/ })
    await toggle.click()
    // Dimension filter pills should appear (abstraction level buttons)
    await expect(page.getByRole('button', { name: 'Code', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'System', exact: true })).toBeVisible()
  })

  test('search finds frameworks by adopter company', async ({ page }) => {
    await page.goto('/')
    const search = page.locator('input[type="text"]')
    await search.fill('Netflix')
    await page.waitForTimeout(300)
    // Should find frameworks that list Netflix as an adopter
    const cards = page.locator('[class*="card"]')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('modal opens on card click', async ({ page }) => {
    await page.goto('/')
    // Click the first framework card
    const firstCard = page.locator('[class*="card"]').first()
    await firstCard.click()
    // Modal overlay should appear (it has class "overlay" from CSS module)
    await expect(page.locator('[class*="overlay"]')).toBeVisible()
    // Modal should contain a heading
    await expect(page.locator('[class*="modal"] h2')).toBeVisible()
  })
})
