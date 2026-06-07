import { useEffect, useReducer } from 'react'
import { INITIAL_CALCULATOR_STATE, calculatorReducer } from '../lib/calculatorReducer'
import { calculatorActionForKey } from '../lib/keyboardActions'
import { CalculatorDisplay } from './CalculatorDisplay'
import { CalculatorKeypad } from './CalculatorKeypad'

export function Calculator() {
  const [calculatorState, dispatch] = useReducer(
    calculatorReducer,
    INITIAL_CALCULATOR_STATE,
  )

  useEffect(() => {
    function handleKeyDown(event) {
      const action = calculatorActionForKey(event.key)

      if (!action) {
        return
      }

      event.preventDefault()
      dispatch(action)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <section aria-label="Calculator" className="grid w-full max-w-sm gap-4">
      <CalculatorDisplay
        currentEntry={calculatorState.currentEntry}
        error={calculatorState.error}
      />
      <CalculatorKeypad onAction={dispatch} />
    </section>
  )
}
