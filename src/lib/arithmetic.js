export const ARITHMETIC_ERRORS = {
  DIVISION_BY_ZERO: 'DIVISION_BY_ZERO',
  OVERFLOW: 'OVERFLOW',
}

function success(value) {
  if (!Number.isFinite(value)) {
    return failure(ARITHMETIC_ERRORS.OVERFLOW, 'Result is too large.')
  }

  return {
    ok: true,
    value,
    error: null,
  }
}

function failure(code, message) {
  return {
    ok: false,
    value: null,
    error: {
      code,
      message,
    },
  }
}

export function add(left, right) {
  return success(left + right)
}

export function subtract(left, right) {
  return success(left - right)
}

export function multiply(left, right) {
  return success(left * right)
}

export function divide(left, right) {
  if (right === 0) {
    return failure(ARITHMETIC_ERRORS.DIVISION_BY_ZERO, 'Cannot divide by zero.')
  }

  return success(left / right)
}
