import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { CalculatorDisplay } from './CalculatorDisplay'

describe('CalculatorDisplay', () => {
  it('renders the current entry', () => {
    const markup = renderToStaticMarkup(<CalculatorDisplay currentEntry="123.45" />)

    expect(markup).toContain('123.45')
    expect(markup).toContain('aria-label="Calculator display"')
    expect(markup).toContain('aria-live="polite"')
  })

  it('falls back to zero for empty current entries', () => {
    const markup = renderToStaticMarkup(<CalculatorDisplay currentEntry="" />)

    expect(markup).toContain('>0</output>')
  })

  it('marks long values as overflowing and preserves the full value in title', () => {
    const longValue = '12345678901234567890'
    const markup = renderToStaticMarkup(<CalculatorDisplay currentEntry={longValue} />)

    expect(markup).toContain('data-overflow="true"')
    expect(markup).toContain(`title="${longValue}"`)
    expect(markup).toContain(longValue)
  })

  it('renders the error state and message', () => {
    const markup = renderToStaticMarkup(
      <CalculatorDisplay
        currentEntry="8"
        error={{ code: 'DIVISION_BY_ZERO', message: 'Cannot divide by zero.' }}
      />,
    )

    expect(markup).toContain('>Error</output>')
    expect(markup).toContain('role="alert"')
    expect(markup).toContain('Cannot divide by zero.')
  })
})
