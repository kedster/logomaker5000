const { test, expect } = require('@playwright/test');

test.describe('LogoMaker5000 Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Logo Maker Pro');
    await expect(page.locator('h3').first()).toContainText('Templates');
  });

  test('logo SVG is present and visible', async ({ page }) => {
    const logoSvg = page.locator('#logoSvg');
    await expect(logoSvg).toBeVisible();
    
    const logoShape = page.locator('#logoShape');
    await expect(logoShape).toBeVisible();
    
    const logoText = page.locator('#logoText');
    await expect(logoText).toBeVisible();
  });

  test('template selection works', async ({ page }) => {
    // Wait for page to load fully
    await page.waitForLoadState('networkidle');
    
    // Click on minimal template (second template)
    await page.locator('.template-item').nth(1).click();
    
    // Wait for template to apply
    await page.waitForTimeout(500);
    
    // Verify template is selected
    await expect(page.locator('.template-item').nth(1)).toHaveClass(/active/);
  });

  test('color controls update logo', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Change shape color
    await page.locator('#shapeColor').fill('#ff0000');
    
    // Trigger an update (some browsers need this)
    await page.locator('#shapeColor').blur();
    
    // Wait a moment for the change to apply
    await page.waitForTimeout(500);
    
    // Verify logo shape color changed
    const shapeColor = await page.locator('#logoShape').getAttribute('fill');
    expect(shapeColor).toBe('#ff0000');
  });

  test('text input updates logo text', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Change company text
    await page.locator('#companyText').fill('TEST');
    
    // Trigger update
    await page.locator('#companyText').blur();
    await page.waitForTimeout(500);
    
    // Verify logo text changed
    const logoText = await page.locator('#logoText').textContent();
    expect(logoText).toBe('TEST');
  });

  test('shape selection works', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Click on square shape (second shape)
    await page.locator('.shape-item').nth(1).click();
    
    // Wait for shape to change
    await page.waitForTimeout(500);
    
    // Verify shape changed to rect element (square creates rect)
    const logoShape = page.locator('#logoShape');
    const tagName = await logoShape.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('rect');
  });

  test('export buttons are present and clickable', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check export buttons exist and are visible
    await expect(page.locator('text=Download SVG')).toBeVisible();
    await expect(page.locator('text=Download PNG')).toBeVisible();
    await expect(page.locator('text=Copy CSS')).toBeVisible();
  });

  test('AI enhancement section is present', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check AI enhancement section exists
    await expect(page.locator('#businessDescription')).toBeVisible();
    await expect(page.locator('#apiKey')).toBeVisible();
    await expect(page.locator('text=✨ AI Enhance Logo')).toBeVisible();
  });

  test('mobile navigation toggle works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check mobile toggle is visible
    await expect(page.locator('.mobile-toggle')).toBeVisible();
    
    // Click the toggle
    await page.locator('.mobile-toggle').click();
    
    // Wait for animation
    await page.waitForTimeout(500);
    
    // Check if sidebar has collapsed class
    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toHaveClass(/collapsed/);
  });
});