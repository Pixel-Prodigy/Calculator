# OmniCalc

OmniCalc is a production-grade Next.js 15 experience showcasing multiple calculator variants (basic, scientific, mortgage, and FX conversion) backed by math.js precision, Zod validation, Zustand state, and Framer Motion micro-interactions. The UI follows a Tailwind + Shadcn design system with Radix primitives to ensure accessibility and responsiveness.

## Tech stack

- Next.js 15 App Router with React 19 RC
- Tailwind CSS, custom tokens, and Shadcn-inspired UI kit
- Framer Motion animations and nuqs-powered URL state
- Zustand for calculator context + React Query for live FX data
- Zod + React Hook Form validation pipelines
- Jest + Testing Library for unit coverage

## Scripts

```bash
pnpm dev      # start Next dev server
pnpm build    # production build
pnpm start    # run the production server
pnpm lint     # lint via next lint
pnpm test     # run Jest test suite
```

## Testing

Jest is configured through `next/jest` with assertions covering:

- Zustand calculator store transitions and history retention.
- Currency conversion math via deterministic fixtures.

Extend coverage in `__tests__/` by importing the helper you want to validate and asserting against predictable inputs.
