const OVERFLOW_THRESHOLD = 12

function displayValue(currentEntry, error) {
  if (error) {
    return 'Error'
  }

  return currentEntry || '0'
}

export function CalculatorDisplay({ currentEntry = '0', error = null }) {
  const value = displayValue(currentEntry, error)
  const hasError = Boolean(error)
  const isOverflowing = value.length > OVERFLOW_THRESHOLD
  const valueClassName = [
    'block w-full overflow-x-auto whitespace-nowrap text-right font-semibold tabular-nums tracking-tight',
    isOverflowing ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-6xl',
    hasError ? 'text-red-200' : 'text-white',
  ].join(' ')

  return (
    <section
      aria-label="Calculator display"
      className="rounded-lg bg-slate-950 p-5 shadow-sm"
    >
      <p className="mb-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
        Display
      </p>
      <output
        aria-live="polite"
        className={valueClassName}
        data-overflow={isOverflowing ? 'true' : 'false'}
        title={isOverflowing ? value : undefined}
      >
        {value}
      </output>
      {hasError ? (
        <p className="mt-3 text-right text-sm font-medium text-red-200" role="alert">
          {error.message}
        </p>
      ) : null}
    </section>
  )
}
