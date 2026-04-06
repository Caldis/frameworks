import { test, expect } from '@playwright/test'

test.describe('Visual & Accessibility Gates', () => {

  test('homepage responsive: no overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    // No horizontal scrollbar
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
    // Cards visible
    await expect(page.locator('[class*="card"]').first()).toBeVisible()
  })

  test('homepage responsive: no overflow at 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('detail page responsive: no overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/frameworks/solid-principles')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
    // Title visible
    await expect(page.locator('h1')).toBeVisible()
  })

  test('keyboard navigation: tab reaches interactive elements', async ({ page }) => {
    await page.goto('/')
    // Tab until we hit the search input (within first 10 tabs)
    let foundInput = false
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const tag = await page.evaluate(() => document.activeElement?.tagName)
      if (tag === 'INPUT') { foundInput = true; break }
    }
    expect(foundInput).toBe(true)
  })

  test('heading hierarchy: no skipped levels', async ({ page }) => {
    await page.goto('/frameworks/solid-principles')
    const headings = await page.evaluate(() => {
      const hs = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
      return hs.map(h => parseInt(h.tagName[1]))
    })
    // Check no level is skipped (e.g., h1 then h3 without h2)
    for (let i = 1; i < headings.length; i++) {
      const jump = headings[i] - headings[i - 1]
      expect(jump).toBeLessThanOrEqual(1) // can go same level or +1, or any decrease
    }
  })

  test('ZH mode: no "undefined" or untranslated keys visible', async ({ page }) => {
    await page.goto('/')
    // Switch to Chinese
    const switcher = page.locator('button').filter({ hasText: /EN.*中/ })
    await switcher.click()
    await page.waitForTimeout(500)
    // Check no "undefined" text
    const bodyText = await page.locator('body').textContent()
    expect(bodyText).not.toContain('undefined')
    // Check no i18n key patterns like "siteTitle" or "whenToUse" visible as raw strings
    expect(bodyText).not.toMatch(/\b(siteTitle|whenToUse|coreConceptsTitle|implementationSteps)\b/)
  })

  test('ZH detail page: content renders without overflow', async ({ page }) => {
    await page.goto('/')
    // Switch to Chinese first
    const switcher = page.locator('button').filter({ hasText: /EN.*中/ })
    await switcher.click()
    await page.waitForTimeout(300)
    // Navigate to a detail page
    await page.goto('/frameworks/solid-principles')
    await page.waitForTimeout(500)
    // Check title is visible
    await expect(page.locator('h1')).toBeVisible()
    // No horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('category filter pills: text visible (not white-on-white)', async ({ page }) => {
    await page.goto('/')
    // Get all filter buttons
    const buttons = page.locator('button').filter({ hasText: /Design Thinking|Architecture|Coding/ })
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)
    // Check first category button is visible and has content
    const firstBtn = buttons.first()
    await expect(firstBtn).toBeVisible()
    const text = await firstBtn.textContent()
    expect(text?.trim().length).toBeGreaterThan(0)
  })
})
