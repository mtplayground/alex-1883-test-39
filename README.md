# alex-1883-test-39

React application scaffolded with Vite and styled with Tailwind CSS.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
npm run test:e2e
npm run format:check
npm run preview
npm run serve:static
```

## Production build

Create the static production output:

```bash
npm ci
npm run build
```

The build output is written to `dist/`. Deploy the contents of that directory to
any static host.

Verify the built output locally:

```bash
npm run serve:static
```

The local static preview serves `dist/` at `http://127.0.0.1:4173/` by default.
