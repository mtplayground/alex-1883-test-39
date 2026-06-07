import { describe, expect, it } from 'vitest'
import { ARITHMETIC_ERRORS, add, divide, multiply, subtract } from './arithmetic'

describe('arithmetic', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toEqual({
      ok: true,
      value: 5,
      error: null,
    })
  })

  it('subtracts the right number from the left number', () => {
    expect(subtract(2, 3)).toEqual({
      ok: true,
      value: -1,
      error: null,
    })
  })

  it('multiplies two numbers', () => {
    expect(multiply(-4, 3)).toEqual({
      ok: true,
      value: -12,
      error: null,
    })
  })

  it('divides the left number by the right number', () => {
    expect(divide(7, 2)).toEqual({
      ok: true,
      value: 3.5,
      error: null,
    })
  })

  it('returns an error state for division by zero', () => {
    expect(divide(7, 0)).toEqual({
      ok: false,
      value: null,
      error: {
        code: ARITHMETIC_ERRORS.DIVISION_BY_ZERO,
        message: 'Cannot divide by zero.',
      },
    })
  })
})
