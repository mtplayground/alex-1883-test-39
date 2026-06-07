import { describe, expect, it } from 'vitest'
import { CALCULATOR_ACTIONS, OPERATORS } from './calculatorReducer'
import { calculatorActionForKey } from './keyboardActions'

describe('calculatorActionForKey', () => {
  it('maps digit keys to digit actions', () => {
    expect(calculatorActionForKey('7')).toEqual({
      type: CALCULATOR_ACTIONS.INPUT_DIGIT,
      digit: '7',
    })
  })

  it.each([
    ['+', OPERATORS.ADD],
    ['-', OPERATORS.SUBTRACT],
    ['*', OPERATORS.MULTIPLY],
    ['/', OPERATORS.DIVIDE],
  ])('maps %s to an operator action', (key, operator) => {
    expect(calculatorActionForKey(key)).toEqual({
      type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
      operator,
    })
  })

  it('maps decimal, equals, deletion, and clear keys', () => {
    expect(calculatorActionForKey('.')).toEqual({
      type: CALCULATOR_ACTIONS.INPUT_DECIMAL,
    })
    expect(calculatorActionForKey('Enter')).toEqual({
      type: CALCULATOR_ACTIONS.CALCULATE,
    })
    expect(calculatorActionForKey('=')).toEqual({
      type: CALCULATOR_ACTIONS.CALCULATE,
    })
    expect(calculatorActionForKey('Backspace')).toEqual({
      type: CALCULATOR_ACTIONS.DELETE_LAST_DIGIT,
    })
    expect(calculatorActionForKey('Escape')).toEqual({
      type: CALCULATOR_ACTIONS.CLEAR,
    })
  })

  it('ignores unsupported keys', () => {
    expect(calculatorActionForKey('a')).toBeNull()
  })
})
