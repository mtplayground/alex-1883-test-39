import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { CalculatorButton, CalculatorKeypad } from './CalculatorKeypad'
import { CALCULATOR_ACTIONS, OPERATORS } from '../lib/calculatorReducer'

describe('CalculatorKeypad', () => {
  it('renders the full calculator keypad', () => {
    const markup = renderToStaticMarkup(<CalculatorKeypad onAction={() => {}} />)

    expect(markup.match(/<button/g)).toHaveLength(19)
    expect(markup).toContain('aria-label="Calculator keypad"')
    expect(markup).toContain('aria-label="Clear"')
    expect(markup).toContain('aria-label="Toggle sign"')
    expect(markup).toContain('aria-label="Percent"')
    expect(markup).toContain('aria-label="Decimal point"')
    expect(markup).toContain('aria-label="Equals"')
  })

  it('renders the zero key as a wide grid item', () => {
    const markup = renderToStaticMarkup(<CalculatorKeypad onAction={() => {}} />)

    expect(markup).toContain('col-span-2')
    expect(markup).toContain('>0</button>')
  })

  it('dispatches the configured button action when clicked', () => {
    const onAction = vi.fn()
    const button = {
      label: '+',
      ariaLabel: 'Add',
      action: {
        type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
        operator: OPERATORS.ADD,
      },
      variant: 'operator',
    }

    const element = CalculatorButton({ button, onAction })

    element.props.onClick()

    expect(onAction).toHaveBeenCalledWith(button.action)
  })
})
