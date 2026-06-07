# alex-1883-test-39 Product Snapshot

## What This Project Is

alex-1883-test-39 is a browser-based calculator built with React, Vite, and
Tailwind CSS. It is deployed as a static web app from the generated `dist/`
directory.

## What It Does

The app renders a calculator with a live display and responsive keypad. Users can
enter calculations with on-screen buttons or physical keyboard input.

## Key Features

- Basic arithmetic: add, subtract, multiply, and divide.
- Immediate-execution chaining, such as `2 + 3 * 4 = 20`.
- Decimal input with duplicate-decimal guarding.
- Sign toggle, percent, clear, equals, and Backspace/delete-entry behavior.
- Division-by-zero and arithmetic overflow error states.
- Long display values are handled with overflow-aware display styling.
- Keyboard support for digits, operators, decimal, Enter/equals, Backspace, and
  Escape.

## Architecture

- UI is composed from `Calculator`, `CalculatorDisplay`, and `CalculatorKeypad`
  components.
- Calculator state is managed by a pure reducer in
  `src/lib/calculatorReducer.js`.
- Arithmetic operations are pure result-returning helpers in
  `src/lib/arithmetic.js`.
- Keyboard input is translated into reducer actions by
  `src/lib/keyboardActions.js`.

## Conventions

- Use Tailwind utility classes for styling.
- Keep calculator behavior in pure functions and reducer logic, with UI
  components dispatching actions.
- Run `npm test`, `npm run test:e2e`, `npm run lint`, `npm run format:check`, and
  `npm run build` before shipping changes.
- Build static output with `npm run build`; preview the built `dist/` directory
  with `npm run serve:static`.
