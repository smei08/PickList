# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# PickList

A redesign of Amazon's shopping cart that adds the bulk actions its selection
model implies but never delivers.

## The problem

Amazon's cart already has checkboxes and a select-all — but the selection only
controls which items count toward checkout. It drives no actual bulk
action: no bulk save-for-later, no bulk delete. PickList adds the missing
actions, and makes a deliberate choice about _where_ each one belongs.

## Demo

**Live:** _https://picklistamazon.netlify.app/_

## Features

- Bulk save-for-later from the cart
- Bulk delete and bulk move-to-cart in the saved-for-later section
- Independent selection state for cart vs. saved
- Live subtotal and item count driven by the current selection

## Tech

React, Vite, CSS. No backend — state is in-memory.

## Run locally

```bash
npm install
npm run dev
```

## Design decisions

The headline decision: bulk **save-for-later** lives in the cart, but bulk
**delete** lives in the saved-for-later section.

In the cart, the checkbox already means "I'm buying this" (it's what the
subtotal counts), so attaching a destructive action to it is risky when
everything starts selected. Individual delete still exists in the cart — only
_bulk_ delete is placed elsewhere, in a section where the checkbox has no
competing meaning and the user is reviewing rather than mid-checkout.

→ Full reasoning, tradeoffs, and bug write-ups in [DECISIONS.md](./DECISIONS.md)

## Limitations

State is in-memory; there's no persistence or backend. A production version
would need a server-side cart, authentication, and optimistic updates with
rollback on failure. This project focuses on the frontend interaction and
state-management patterns, not the infrastructure behind them.

---

Not affiliated with Amazon. Product names and images are placeholders; the
layout is recreated for study purposes only.
