import { CALCULATOR_ACTIONS, OPERATORS } from './calculatorReducer'

const OPERATOR_KEYS = {
  '+': OPERATORS.ADD,
  '-': OPERATORS.SUBTRACT,
  '*': OPERATORS.MULTIPLY,
  '/': OPERATORS.DIVIDE,
}

export function calculatorActionForKey(key) {
  if (/^\d$/.test(key)) {
    return {
      type: CALCULATOR_ACTIONS.INPUT_DIGIT,
      digit: key,
    }
  }

  if (OPERATOR_KEYS[key]) {
    return {
      type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
      operator: OPERATOR_KEYS[key],
    }
  }

  if (key === '.') {
    return {
      type: CALCULATOR_ACTIONS.INPUT_DECIMAL,
    }
  }

  if (key === 'Enter' || key === '=') {
    return {
      type: CALCULATOR_ACTIONS.CALCULATE,
    }
  }

  if (key === 'Backspace') {
    return {
      type: CALCULATOR_ACTIONS.DELETE_LAST_DIGIT,
    }
  }

  if (key === 'Escape') {
    return {
      type: CALCULATOR_ACTIONS.CLEAR,
    }
  }

  return null
}
