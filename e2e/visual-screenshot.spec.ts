import { test } from '@playwright/test'
import path from 'path'

const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-results', 'screenshots')

/**
 * Screenshot Capture for Design Critic Review
 *
 * These tests don't assert — they capture screenshots at key pages
 * for a separate Design Critic agent to review visually.
 * Screenshots are saved to test-results/screenshots/
 */
test.describe('Screenshot Capture for Design Review', () => {

  test('homepage — desktop 1200px', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/home-desktop.png`, fullPage: true })
  })

  test('homepage — mobile 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/home-mobile.png`, fullPage: true })
  })

  test('homepage — with filters open', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/')
    const toggle = page.locator('button').filter({ hasText: /Filters/ })
    await toggle.click()
    await page.waitForTimeout(300)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/home-filters.png`, fullPage: false })
  })

  test('homepage ZH — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/')
    const switcher = page.locator('button').filter({ hasText: /EN.*中/ })
    await switcher.click()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/home-zh.png`, fullPage: true })
  })

  test('framework detail — SOLID Principles', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/frameworks/solid-principles')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/detail-solid.png`, fullPage: true })
  })

  test('framework detail — DDD (zh)', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/')
    const switcher = page.locator('button').filter({ hasText: /EN.*中/ })
    await switcher.click()
    await page.waitForTimeout(300)
    await page.goto('/frameworks/domain-driven-design')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/detail-ddd-zh.png`, fullPage: true })
  })

  test('framework detail — mobile 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/frameworks/solid-principles')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/detail-mobile.png`, fullPage: true })
  })

  test('category page — Architecture', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/category/architecture')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/category-arch.png`, fullPage: true })
  })

  test('map page', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/map')
    await page.waitForTimeout(2000) // D3 needs time to settle
    await page.screenshot({ path: `${SCREENSHOT_DIR}/map.png`, fullPage: false })
  })

  test('modal — quick preview', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/')
    await page.waitForTimeout(300)
    const card = page.locator('[class*="card"]').first()
    await card.click()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/modal.png`, fullPage: false })
  })

  test('compare page', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/compare')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/compare.png`, fullPage: true })
  })

  test('selector page', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/selector')
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${SCREENSHOT_DIR}/selector.png`, fullPage: true })
  })
})
