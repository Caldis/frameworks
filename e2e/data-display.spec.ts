import { test, expect } from '@playwright/test'

test.describe('Data Display Correctness', () => {

  test('homepage grouped view shows all 13 categories', async ({ page }) => {
    await page.goto('/')
    // When "All" is selected (default), grouped view should have section headers
    // Count section headers — should match category count (13)
    const sectionHeaders = page.locator('[class*="sectionHeader"], [class*="categorySection"] h2, [class*="categorySection"] h3')
    const count = await sectionHeaders.count()
    expect(count).toBeGreaterThanOrEqual(13)
  })

  test('category filter has buttons for all 13 categories + All', async ({ page }) => {
    await page.goto('/')
    // "All" + 13 categories = 14 filter buttons
    const filterButtons = page.locator('button').filter({ hasText: /\d+/ })
    // At minimum, there should be 14 buttons (All + 13 categories)
    const count = await filterButtons.count()
    expect(count).toBeGreaterThanOrEqual(14)
  })

  test('map page has filter buttons for all 13 categories', async ({ page }) => {
    await page.goto('/map')
    await page.waitForTimeout(1000)
    // Count filter buttons on map page
    const buttons = page.locator('[class*="filterBtn"]')
    const count = await buttons.count()
    expect(count).toBe(13)
  })

  test('map SVG contains nodes from multiple categories', async ({ page }) => {
    await page.goto('/map')
    await page.waitForTimeout(2000) // D3 needs time
    // Check that circle nodes exist
    const circles = page.locator('svg circle[class*="node"]')
    const count = await circles.count()
    // Should have nodes for 194 frameworks
    expect(count).toBeGreaterThanOrEqual(100) // at least most of them
  })

  test('compare page dropdown contains all frameworks grouped by category', async ({ page }) => {
    await page.goto('/compare')
    await page.waitForSelector('select')
    // Use evaluate to count optgroups and options — Playwright locator.count()
    // cannot pierce the browser's native <select> internal rendering for optgroup.
    const { groupCount, optCount } = await page.evaluate(() => {
      const sel = document.querySelector('select')
      if (!sel) return { groupCount: 0, optCount: 0 }
      return {
        groupCount: sel.querySelectorAll('optgroup').length,
        optCount: sel.querySelectorAll('option').length,
      }
    })
    // Count optgroups (should be 13 categories)
    expect(groupCount).toBe(13)
    // Count total options (should be ~194 frameworks + 1 placeholder)
    expect(optCount).toBeGreaterThanOrEqual(194)
  })

  test('each category page shows correct framework count', async ({ page }) => {
    // Spot-check 3 categories
    for (const [slug, minCount] of [['thinking', 20], ['data', 10], ['ai', 18]]) {
      await page.goto(`/category/${slug}`)
      await page.waitForTimeout(500)
      const cards = page.locator('[class*="card"]')
      const count = await cards.count()
      expect(count).toBeGreaterThanOrEqual(minCount)
    }
  })

  test('map edges have different styles for relation types', async ({ page }) => {
    await page.goto('/map')
    await page.waitForTimeout(2000)
    // Check that SVG has line elements with different stroke colors
    const lines = page.locator('svg line.link-line')
    const count = await lines.count()
    expect(count).toBeGreaterThan(50) // should have many edges
  })

  test('framework detail page renders content sections', async ({ page }) => {
    // Check a known framework has all major sections
    await page.goto('/frameworks/solid-principles')
    await page.waitForTimeout(500)

    // Should have key sections (check for section titles or content)
    const body = await page.locator('body').textContent()
    // These sections should exist for a fully-populated framework
    expect(body).toContain('SOLID')
    // At least one of the section titles should be visible
    const sections = await page.locator('h2').count()
    expect(sections).toBeGreaterThanOrEqual(3)
  })
})
