// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Calculator } from './Calculator'

afterEach(() => {
  cleanup()
})

function displayText() {
  return screen.getByLabelText('Calculator display').querySelector('output').textContent
}

function press(name) {
  fireEvent.click(screen.getByRole('button', { name }))
}

describe('Calculator', () => {
  it('renders the display and keypad together', () => {
    render(<Calculator />)

    expect(screen.getByLabelText('Calculator')).toBeTruthy()
    expect(screen.getByLabelText('Calculator display')).toBeTruthy()
    expect(screen.getByLabelText('Calculator keypad')).toBeTruthy()
    expect(displayText()).toBe('0')
  })

  it('updates the display from keypad events', () => {
    render(<Calculator />)

    press('1')
    press('2')

    expect(displayText()).toBe('12')
  })

  it('renders calculated results live', () => {
    render(<Calculator />)

    press('1')
    press('2')
    press('Add')
    press('7')
    press('Equals')

    expect(displayText()).toBe('19')
  })

  it('renders engine errors from keypad actions', () => {
    render(<Calculator />)

    press('8')
    press('Divide')
    press('0')
    press('Equals')

    expect(displayText()).toBe('Error')
    expect(screen.getByRole('alert').textContent).toBe('Cannot divide by zero.')
  })
})
