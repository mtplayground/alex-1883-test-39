import { expect, test } from '@playwright/test'

async function display(page) {
  return page.getByLabel('Calculator display').locator('output')
}

async function pressButton(page, name) {
  await page.getByRole('button', { name }).click()
}

test.describe('calculator user flows', () => {
  test('runs chained immediate-execution math', async ({ page }) => {
    await page.goto('/')

    await pressButton(page, '2')
    await pressButton(page, 'Add')
    await pressButton(page, '3')
    await pressButton(page, 'Multiply')
    await pressButton(page, '4')
    await pressButton(page, 'Equals')

    await expect(await display(page)).toHaveText('20')
  })

  test('handles decimals and clear', async ({ page }) => {
    await page.goto('/')

    await pressButton(page, 'Decimal point')
    await pressButton(page, '5')
    await pressButton(page, 'Add')
    await pressButton(page, '1')
    await pressButton(page, 'Equals')

    await expect(await display(page)).toHaveText('1.5')

    await pressButton(page, 'Clear')

    await expect(await display(page)).toHaveText('0')
  })

  test('shows division errors and recovers with new input', async ({ page }) => {
    await page.goto('/')

    await pressButton(page, '8')
    await pressButton(page, 'Divide')
    await pressButton(page, '0')
    await pressButton(page, 'Equals')

    await expect(await display(page)).toHaveText('Error')
    await expect(page.getByRole('alert')).toHaveText('Cannot divide by zero.')

    await pressButton(page, '6')

    await expect(await display(page)).toHaveText('6')
  })

  test('supports keyboard input for math, Backspace, and Escape', async ({ page }) => {
    await page.goto('/')
    await page.locator('body').click()

    await page.keyboard.press('8')
    await page.keyboard.press('/')
    await page.keyboard.press('2')
    await page.keyboard.press('Enter')

    await expect(await display(page)).toHaveText('4')

    await page.keyboard.press('1')
    await page.keyboard.press('2')
    await page.keyboard.press('Backspace')

    await expect(await display(page)).toHaveText('1')

    await page.keyboard.press('Escape')

    await expect(await display(page)).toHaveText('0')
  })
})
