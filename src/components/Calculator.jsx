import { useReducer } from 'react'
import { INITIAL_CALCULATOR_STATE, calculatorReducer } from '../lib/calculatorReducer'
import { CalculatorDisplay } from './CalculatorDisplay'
import { CalculatorKeypad } from './CalculatorKeypad'

export function Calculator() {
  const [calculatorState, dispatch] = useReducer(
    calculatorReducer,
    INITIAL_CALCULATOR_STATE,
  )

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
