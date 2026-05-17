# Haul

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Haul** is a lightweight, single-page grocery list application built with React and TypeScript. It lets you manage a personal shopping list entirely in the browser — no account, no server, no setup required beyond opening the app.

You can add any item by typing its name into the input field and hitting Submit. Each item appears instantly in the list below, where it can be edited in place or removed individually. Clicking the edit button on any item loads its name back into the input field and switches the form into edit mode, allowing you to rename it and confirm the change. A dedicated **Clear Items** button wipes the entire list at once when you need to start fresh.

Every action — adding, editing, removing, or clearing — triggers a brief feedback alert that appears at the top of the page and automatically disappears after three seconds, so you always know whether the operation succeeded or if something went wrong (such as trying to submit an empty entry).

All data is persisted to the browser's `localStorage`, meaning your list survives page refreshes and browser restarts without any backend. The state is kept in sync automatically: every change to the list is written to storage immediately, and the saved list is restored on every load.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

On top of the stack above, the project pulls in the following libraries, grouped by their role:

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Getting Started

### Prerequisites

- **Node.js 22+** (the repository pins the version via `.nvmrc`; run `nvm use` to switch automatically).

### Run locally

With the stack and dependencies in place, run Haul locally with the following steps:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Testing

Once the app is running, you can verify behavior with the included test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch, guaranteeing that the codebase stays lintable, type-safe, well-tested and buildable before any change is merged.

### Pipeline overview

```
              ┌─── PR or push to main ───┐
              ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    lint-and-audit    │─▶│      testing     │─▶│       build      │
│   eslint · tsc      │  │   jest (jsdom)   │  │    vite build    │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

All jobs run on `ubuntu-latest`, use the Node.js version pinned in [`.nvmrc`](.nvmrc) via `actions/setup-node` (with `npm` cache enabled), and install dependencies with `npm ci` to honor the committed `package-lock.json`.

### Validation jobs

1. **`lint-and-audit`** — runs `npm run lint` (ESLint over `src/`) followed by `npm run type-check` (`tsc -p tsconfig.app.json --noEmit`). Acts as the fast gate: a lint or type error fails the pipeline before any test or build runs.
2. **`testing`** — runs the full Jest suite headlessly under `jest-environment-jsdom` with `npm run test`. Depends on `lint-and-audit` succeeding first.
3. **`build`** — produces a production bundle with `npm run build` (TypeScript compilation + Vite build) to guarantee that the app is shippable. Depends on `testing` succeeding first.

Jobs are chained with `needs:` so the pipeline aborts as soon as the first failure happens, saving runner minutes on the downstream stages.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm test

# build
npm run build
```

### Where the build outputs live

| Output                                           | Location                                                    |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Validation logs (lint, type-check, tests, build) | **Actions** tab on GitHub                                   |
| Production bundle from `vite build`              | Ephemeral, inside the runner (not published as an artifact) |

> **Note:** this pipeline only validates changes — it does not cut releases, publish artifacts or push tags back to `main`. Releases, if needed, are produced manually.

## Security Audit

Beyond functional tests, the project includes tooling to audit dependencies and overall code health.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/haul`](https://www.diegolibonati.com.ar/#/project/haul)
