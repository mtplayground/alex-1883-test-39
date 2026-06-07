import { describe, expect, it } from 'vitest'
import { ARITHMETIC_ERRORS } from './arithmetic'
import {
  CALCULATOR_ACTIONS,
  INITIAL_CALCULATOR_STATE,
  OPERATORS,
  calculatorReducer,
} from './calculatorReducer'

function reduceActions(actions, state = INITIAL_CALCULATOR_STATE) {
  return actions.reduce(calculatorReducer, state)
}

function digit(digitValue) {
  return {
    type: CALCULATOR_ACTIONS.INPUT_DIGIT,
    digit: digitValue,
  }
}

function operator(operatorValue) {
  return {
    type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
    operator: operatorValue,
  }
}

describe('calculatorReducer', () => {
  it('builds the current entry from digit input', () => {
    const state = reduceActions([digit('0'), digit('7'), digit('5')])

    expect(state.currentEntry).toBe('75')
    expect(state.accumulator).toBeNull()
    expect(state.pendingOperator).toBeNull()
  })

  it('guards against duplicate decimal points', () => {
    const state = reduceActions([
      digit('1'),
      { type: CALCULATOR_ACTIONS.INPUT_DECIMAL },
      digit('2'),
      { type: CALCULATOR_ACTIONS.INPUT_DECIMAL },
      digit('3'),
    ])

    expect(state.currentEntry).toBe('1.23')
  })

  it('chains pending operations with immediate execution', () => {
    const state = reduceActions([
      digit('2'),
      operator(OPERATORS.ADD),
      digit('3'),
      operator(OPERATORS.MULTIPLY),
      digit('4'),
      { type: CALCULATOR_ACTIONS.CALCULATE },
    ])

    expect(state.currentEntry).toBe('20')
    expect(state.accumulator).toBeNull()
    expect(state.pendingOperator).toBeNull()
  })

  it('allows changing the pending operator before entering the next number', () => {
    const state = reduceActions([
      digit('8'),
      operator(OPERATORS.ADD),
      operator(OPERATORS.SUBTRACT),
      digit('3'),
      { type: CALCULATOR_ACTIONS.CALCULATE },
    ])

    expect(state.currentEntry).toBe('5')
  })

  it('toggles the sign of the current entry', () => {
    const state = reduceActions([
      digit('4'),
      digit('2'),
      { type: CALCULATOR_ACTIONS.TOGGLE_SIGN },
    ])

    expect(state.currentEntry).toBe('-42')

    const toggledBack = calculatorReducer(state, {
      type: CALCULATOR_ACTIONS.TOGGLE_SIGN,
    })

    expect(toggledBack.currentEntry).toBe('42')
  })

  it('converts the current entry to a percent value', () => {
    const state = reduceActions([
      digit('5'),
      digit('0'),
      { type: CALCULATOR_ACTIONS.APPLY_PERCENT },
    ])

    expect(state.currentEntry).toBe('0.5')
  })

  it('clears all calculator state', () => {
    const dirtyState = reduceActions([
      digit('9'),
      operator(OPERATORS.DIVIDE),
      digit('3'),
    ])

    expect(calculatorReducer(dirtyState, { type: CALCULATOR_ACTIONS.CLEAR })).toEqual(
      INITIAL_CALCULATOR_STATE,
    )
  })

  it('returns an error state when dividing by zero', () => {
    const state = reduceActions([
      digit('8'),
      operator(OPERATORS.DIVIDE),
      digit('0'),
      { type: CALCULATOR_ACTIONS.CALCULATE },
    ])

    expect(state).toMatchObject({
      currentEntry: 'Error',
      accumulator: null,
      pendingOperator: null,
      shouldReplaceEntry: true,
      error: {
        code: ARITHMETIC_ERRORS.DIVISION_BY_ZERO,
        message: 'Cannot divide by zero.',
      },
    })
  })
})
