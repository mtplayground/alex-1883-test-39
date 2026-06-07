import { add, divide, multiply, subtract } from './arithmetic'

export const CALCULATOR_ACTIONS = {
  INPUT_DIGIT: 'INPUT_DIGIT',
  INPUT_DECIMAL: 'INPUT_DECIMAL',
  CHOOSE_OPERATOR: 'CHOOSE_OPERATOR',
  CALCULATE: 'CALCULATE',
  DELETE_LAST_DIGIT: 'DELETE_LAST_DIGIT',
  TOGGLE_SIGN: 'TOGGLE_SIGN',
  APPLY_PERCENT: 'APPLY_PERCENT',
  CLEAR: 'CLEAR',
}

export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
}

export const INITIAL_CALCULATOR_STATE = {
  currentEntry: '0',
  accumulator: null,
  pendingOperator: null,
  shouldReplaceEntry: false,
  error: null,
}

const OPERATIONS = {
  [OPERATORS.ADD]: add,
  [OPERATORS.SUBTRACT]: subtract,
  [OPERATORS.MULTIPLY]: multiply,
  [OPERATORS.DIVIDE]: divide,
}

function clearError(state) {
  if (!state.error) {
    return state
  }

  return INITIAL_CALCULATOR_STATE
}

function formatNumber(value) {
  if (Object.is(value, -0)) {
    return '0'
  }

  return String(Number.parseFloat(value.toPrecision(12)))
}

function currentValue(state) {
  return Number(state.currentEntry)
}

function calculatePending(state) {
  if (!state.pendingOperator || state.accumulator === null) {
    return {
      ...state,
      shouldReplaceEntry: true,
    }
  }

  const operation = OPERATIONS[state.pendingOperator]
  const result = operation(state.accumulator, currentValue(state))

  if (!result.ok) {
    return {
      ...INITIAL_CALCULATOR_STATE,
      currentEntry: 'Error',
      shouldReplaceEntry: true,
      error: result.error,
    }
  }

  return {
    ...state,
    currentEntry: formatNumber(result.value),
    accumulator: result.value,
    shouldReplaceEntry: true,
    error: null,
  }
}

function inputDigit(state, digit) {
  if (!/^\d$/.test(digit)) {
    return state
  }

  const baseState = clearError(state)

  if (baseState.shouldReplaceEntry) {
    return {
      ...baseState,
      currentEntry: digit,
      shouldReplaceEntry: false,
    }
  }

  return {
    ...baseState,
    currentEntry:
      baseState.currentEntry === '0' ? digit : `${baseState.currentEntry}${digit}`,
  }
}

function inputDecimal(state) {
  const baseState = clearError(state)

  if (baseState.shouldReplaceEntry) {
    return {
      ...baseState,
      currentEntry: '0.',
      shouldReplaceEntry: false,
    }
  }

  if (baseState.currentEntry.includes('.')) {
    return baseState
  }

  return {
    ...baseState,
    currentEntry: `${baseState.currentEntry}.`,
  }
}

function deleteLastDigit(state) {
  const baseState = clearError(state)

  if (baseState.shouldReplaceEntry) {
    return {
      ...baseState,
      currentEntry: '0',
      shouldReplaceEntry: false,
    }
  }

  if (
    baseState.currentEntry.length === 1 ||
    (baseState.currentEntry.length === 2 && baseState.currentEntry.startsWith('-'))
  ) {
    return {
      ...baseState,
      currentEntry: '0',
    }
  }

  return {
    ...baseState,
    currentEntry: baseState.currentEntry.slice(0, -1),
  }
}

function chooseOperator(state, operator) {
  if (!OPERATIONS[operator] || state.error) {
    return state
  }

  if (state.pendingOperator && !state.shouldReplaceEntry) {
    const nextState = calculatePending(state)

    if (nextState.error) {
      return nextState
    }

    return {
      ...nextState,
      pendingOperator: operator,
      shouldReplaceEntry: true,
    }
  }

  return {
    ...state,
    accumulator:
      state.accumulator === null || !state.shouldReplaceEntry
        ? currentValue(state)
        : state.accumulator,
    pendingOperator: operator,
    shouldReplaceEntry: true,
  }
}

function calculate(state) {
  if (state.error) {
    return state
  }

  const nextState = calculatePending(state)

  return {
    ...nextState,
    accumulator: null,
    pendingOperator: null,
  }
}

function toggleSign(state) {
  const baseState = clearError(state)

  if (baseState.currentEntry === '0') {
    return baseState
  }

  return {
    ...baseState,
    currentEntry: baseState.currentEntry.startsWith('-')
      ? baseState.currentEntry.slice(1)
      : `-${baseState.currentEntry}`,
  }
}

function applyPercent(state) {
  const baseState = clearError(state)
  const value = currentValue(baseState) / 100

  return {
    ...baseState,
    currentEntry: formatNumber(value),
  }
}

export function calculatorReducer(state, action) {
  switch (action.type) {
    case CALCULATOR_ACTIONS.INPUT_DIGIT:
      return inputDigit(state, action.digit)
    case CALCULATOR_ACTIONS.INPUT_DECIMAL:
      return inputDecimal(state)
    case CALCULATOR_ACTIONS.CHOOSE_OPERATOR:
      return chooseOperator(state, action.operator)
    case CALCULATOR_ACTIONS.CALCULATE:
      return calculate(state)
    case CALCULATOR_ACTIONS.DELETE_LAST_DIGIT:
      return deleteLastDigit(state)
    case CALCULATOR_ACTIONS.TOGGLE_SIGN:
      return toggleSign(state)
    case CALCULATOR_ACTIONS.APPLY_PERCENT:
      return applyPercent(state)
    case CALCULATOR_ACTIONS.CLEAR:
      return INITIAL_CALCULATOR_STATE
    default:
      return state
  }
}
