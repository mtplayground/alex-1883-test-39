import { useReducer } from 'react'
import { CalculatorDisplay } from './components/CalculatorDisplay'
import { CalculatorKeypad } from './components/CalculatorKeypad'
import { INITIAL_CALCULATOR_STATE, calculatorReducer } from './lib/calculatorReducer'

function App() {
  const [calculatorState, dispatch] = useReducer(
    calculatorReducer,
    INITIAL_CALCULATOR_STATE,
  )

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-800">
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-5xl items-center gap-8 md:grid-cols-[1fr_360px]">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
            Calculator
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-none text-slate-950 sm:text-7xl">
            alex-1883-test-39
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            A working React application scaffold with local development, production
            build, and preview commands ready to use.
          </p>
        </div>
        <div className="grid w-full max-w-sm gap-4 justify-self-center md:justify-self-end">
          <CalculatorDisplay
            currentEntry={calculatorState.currentEntry}
            error={calculatorState.error}
          />
          <CalculatorKeypad onAction={dispatch} />
        </div>
      </section>
    </main>
  )
}

export default App
