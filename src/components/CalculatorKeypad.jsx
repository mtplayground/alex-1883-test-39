import { CALCULATOR_ACTIONS, OPERATORS } from '../lib/calculatorReducer'

const BUTTONS = [
  {
    label: 'C',
    ariaLabel: 'Clear',
    action: { type: CALCULATOR_ACTIONS.CLEAR },
    variant: 'control',
  },
  {
    label: '+/-',
    ariaLabel: 'Toggle sign',
    action: { type: CALCULATOR_ACTIONS.TOGGLE_SIGN },
    variant: 'control',
  },
  {
    label: '%',
    ariaLabel: 'Percent',
    action: { type: CALCULATOR_ACTIONS.APPLY_PERCENT },
    variant: 'control',
  },
  {
    label: '/',
    ariaLabel: 'Divide',
    action: {
      type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
      operator: OPERATORS.DIVIDE,
    },
    variant: 'operator',
  },
  {
    label: '7',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '7' },
  },
  {
    label: '8',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '8' },
  },
  {
    label: '9',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '9' },
  },
  {
    label: '*',
    ariaLabel: 'Multiply',
    action: {
      type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
      operator: OPERATORS.MULTIPLY,
    },
    variant: 'operator',
  },
  {
    label: '4',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '4' },
  },
  {
    label: '5',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '5' },
  },
  {
    label: '6',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '6' },
  },
  {
    label: '-',
    ariaLabel: 'Subtract',
    action: {
      type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
      operator: OPERATORS.SUBTRACT,
    },
    variant: 'operator',
  },
  {
    label: '1',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '1' },
  },
  {
    label: '2',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '2' },
  },
  {
    label: '3',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '3' },
  },
  {
    label: '+',
    ariaLabel: 'Add',
    action: {
      type: CALCULATOR_ACTIONS.CHOOSE_OPERATOR,
      operator: OPERATORS.ADD,
    },
    variant: 'operator',
  },
  {
    label: '0',
    action: { type: CALCULATOR_ACTIONS.INPUT_DIGIT, digit: '0' },
    span: 'wide',
  },
  {
    label: '.',
    ariaLabel: 'Decimal point',
    action: { type: CALCULATOR_ACTIONS.INPUT_DECIMAL },
  },
  {
    label: '=',
    ariaLabel: 'Equals',
    action: { type: CALCULATOR_ACTIONS.CALCULATE },
    variant: 'equals',
  },
]

function buttonClassName({ span, variant = 'digit' }) {
  const base =
    'min-h-14 rounded-lg text-xl font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  const spans = span === 'wide' ? 'col-span-2' : ''
  const variants = {
    control: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
    digit: 'bg-white text-slate-950 hover:bg-slate-100',
    equals: 'bg-blue-600 text-white hover:bg-blue-700',
    operator: 'bg-slate-800 text-white hover:bg-slate-700',
  }

  return [base, spans, variants[variant]].filter(Boolean).join(' ')
}

export function CalculatorButton({ button, onAction }) {
  return (
    <button
      aria-label={button.ariaLabel}
      className={buttonClassName(button)}
      onClick={() => onAction(button.action)}
      type="button"
    >
      {button.label}
    </button>
  )
}

export function CalculatorKeypad({ onAction }) {
  return (
    <section aria-label="Calculator keypad" className="grid grid-cols-4 gap-3">
      {BUTTONS.map((button) => (
        <CalculatorButton
          button={button}
          key={button.ariaLabel || button.label}
          onAction={onAction}
        />
      ))}
    </section>
  )
}
