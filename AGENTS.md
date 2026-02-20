# AGENTS.md

This file provides guidelines for AI coding agents working in this codebase.

## Project Overview

Astro + React quiz application using TanStack Router, Tailwind CSS 4, nanostores, and i18n (English/Spanish).

## Build/Lint/Test Commands

```bash
bun run dev           # Start dev server (compiles i18n first)
bun run build         # Production build (typecheck + build)
bun run typecheck     # Run astro check (TypeScript validation)
bun run lint          # ESLint for .ts/.tsx files
bun run check         # Full check (typecheck + lint)
bun run format        # Prettier format all files
bun run i18n:compile  # Compile i18n translations
```

**Note**: No tests configured.

## Code Style Guidelines

### General Formatting

- **No semicolons** (Prettier)
- **Trailing commas**: ES5 style
- **Tab width**: 2 spaces for `.astro`, `.json`, `.md`
- **Imports**: Auto-organized by prettier-plugin-organize-imports

### TypeScript

- **Strict mode** with `noUncheckedIndexedAccess` (array access requires `!` or null checks)
- **verbatimModuleSyntax**: Use `import type { X }`
- **Module resolution**: bundler mode

### File Organization

```plaintext
src/
├── core/           # Shared utilities, components, configurations
│   ├── components/ # UI (ui/, form/, atoms/, molecules/, organisms/, template/)
│   ├── lib/        # Utilities (error.ts, tailwind.ts)
│   └── kit/        # Helper functions and shared types
├── [feature]/      # Feature modules (quiz, game, ai, settings, home)
│   ├── components/ # Feature-specific components
│   ├── hook/       # React hooks (use-*.ts)
│   ├── store/      # Nanostores state (*-store.ts)
│   └── model/      # Zod schemas and types (*-model.ts)
├── pages/          # TanStack Router routes
└── translation/    # i18n translations
```

### Naming Conventions

| Type       | Pattern                     | Example                 |
| ---------- | --------------------------- | ----------------------- |
| Components | PascalCase                  | `QuizGridItem.tsx`      |
| Hooks      | camelCase, `use-` prefix    | `use-current-quiz.ts`   |
| Stores     | camelCase, `-store` suffix  | `current-quiz-store.ts` |
| Models     | kebab-case, `-model` suffix | `quiz-model.ts`         |

### Imports Order

1. Path aliases (`@/...`) 2. External packages 3. Relative imports

```typescript
import { BaseError } from "@/core/lib/error"
import { useStore } from "@nanostores/react"
import { useState } from "react"
```

### Path Aliases

`@/*` → `./src/*` | `@assets/*` → `./src/assets/*` | `@styles` → `./src/styles.css`

### React Guidelines

- **React Compiler enabled** - avoid manual memoization
- Export variants with `cva`:

```typescript
// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
```

### Styling (Tailwind CSS 4)

```typescript
import { cn, tw } from "@/core/lib/tailwind"

<div className={cn("base-classes", conditional && "conditional-class")} />
const classes = tw`flex items-center justify-center`  // Helps Prettier sorting
```

### State Management (Nanostores)

```typescript
// Store (src/quiz/store/current-quiz-store.ts)
export const currentQuizStore = atom<Quiz | null>(null)

// Hook (src/quiz/hook/use-current-quiz.ts)
export function useCurrentQuiz() {
  const currentQuiz = useStore(currentQuizStore)
  return { currentQuiz }
}
```

### Error Handling

```typescript
import { BaseError } from "@/core/lib/error"

class CurrentQuizNullError extends BaseError {
  constructor() {
    super("currentQuiz is null. Ensure store is initialized.")
  }
}
```

### Form Validation (Zod v4)

```typescript
import { i18nInstance } from "@/translation/kit/i18n-kit"
import z from "zod"

const errors = i18nInstance("component:name", { required: "Required" })

export const MySchema = z.object({
  name: z.string().min(1, { error: () => errors.get().required }),
})
```

### React Hook Form

```typescript
const form = useForm<MyType>({ resolver: zodResolver(MySchema) })
```

### i18n

```typescript
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"

const messages = i18nInstance("component:name", {
  key: "Default text",
  withParam: params("Text {param}"),
})

// In component:
const t = useStore(messages)
t.withParam({ param: "value" })
```

### TanStack Router

- Routes: `src/pages/_app/routes/`
- Root layout: `__root.tsx`
- Locale routes: `{-$locale}/`
- Generated: `routeTree.gen.ts` (do not edit)

### Component Props

```typescript
import type { ClassNameProp } from "@/core/kit/component-kit"

interface ButtonProps extends ClassNameProp {
  variant?: "default" | "outline"
}
```

### Files to Ignore

`**/*.gen.ts`, `**/.astro/`, `**/.tanstack/`, `**/dist/`, `**/node_modules/`
