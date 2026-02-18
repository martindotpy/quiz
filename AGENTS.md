# AGENTS.md

This file provides guidelines for AI coding agents working in this codebase.

## Project Overview

This is an Astro + React application using TanStack Router for routing, Tailwind CSS 4 for styling, and nanostores for state management. It's a quiz application with i18n support (English/Spanish).

## Build/Lint/Test Commands

```bash
# Development
bun run dev                 # Start dev server (compiles i18n first)

# Build
bun run build               # Production build (typecheck + build)

# Type checking
bun run typecheck           # Run astro check (TypeScript validation)

# Linting
bun run lint                # ESLint for .ts/.tsx files
bun run check               # Full check (typecheck + lint)

# Formatting
bun run format              # Prettier format all files

# i18n
bun run i18n:compile        # Compile i18n translations
```

**Note**: This project does not have tests configured.

## Code Style Guidelines

### General Formatting

- **No semicolons** - configured in Prettier
- **Trailing commas**: ES5 style
- **Tab width**: 2 spaces for `.astro`, `.json`, `.markdown` files
- **Imports**: Automatically organized by prettier-plugin-organize-imports

### TypeScript

- **Strict mode enabled** with additional checks:
  - `noUncheckedIndexedAccess`: Accessing array elements requires `!` or null checks
  - `noFallthroughCasesInSwitch`: Enabled
- **verbatimModuleSyntax**: Use explicit type imports (`import type { X }`)
- **Module resolution**: bundler mode

### File Organization

```plaintext
src/
├── core/           # Shared utilities, components, configurations
│   ├── components/ # UI components (atoms, molecules, organisms, templates)
│   ├── lib/        # Utility functions
│   └── kit/        # Helper functions for common patterns
├── [feature]/      # Feature modules (quiz, game, ai, settings, home)
│   ├── components/ # Feature-specific components
│   ├── hook/       # React hooks
│   ├── store/      # Nanostores state
│   ├── model/      # Zod schemas and types
│   └── collection/ # Data collections
├── pages/          # TanStack Router routes
│   └── _app/routes/
└── translation/    # i18n translations and utilities
```

### Naming Conventions

- **Components**: PascalCase files and exports (`QuizGridItem.tsx`, `Button`)
- **Hooks**: camelCase with `use-` prefix in filename (`use-current-quiz.ts`)
- **Stores**: camelCase with `-store` suffix (`current-quiz-store.ts`)
- **Utilities**: camelCase (`array.ts`, `string-utils.ts`)
- **Models**: kebab-case with `-model` suffix (`quiz-model.ts`)
- **Types/Interfaces**: PascalCase

### Imports Order

1. Path aliases (`@/...`)
2. External packages
3. Relative imports

Example:

```typescript
import { BaseError } from "@/core/lib/error"
import { useStore } from "@nanostores/react"
import { useState } from "react"
```

### Path Aliases

```typescript
"@/*"          → "./src/*"
"@assets/*"    → "./src/assets/*"
"@styles"      → "./src/styles.css"
"@tailwind-config" → "./tailwind.config.js"
```

### React Guidelines

- **React Compiler** is enabled - avoid manual memoization unless necessary
- Use functional components with explicit return types when complex
- Component props interface should be named `ComponentNameProps`

### State Management (Nanostores)

```typescript
// Store pattern
export const currentQuizStore = atom<Quiz | null>(null)

// Hook pattern for accessing stores
export function useCurrentQuiz() {
  const currentQuiz = useStore(currentQuizStore)
  return { currentQuiz }
}
```

### Styling (Tailwind CSS 4)

- Use the `cn()` utility for conditional class merging:

```typescript
import { cn } from "@/core/lib/tailwind"

<div className={cn("base-classes", conditional && "conditional-class")} />
```

- Tailwind classes are auto-sorted by prettier-plugin-tailwindcss

### i18n Pattern

```typescript
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"

const messages = i18nInstance("component:name", {
  key: "Default English text",
  withParam: params("Text {param}"),
})

// In component:
const t = useStore(messages)
t.key // "Default English text"
t.withParam({ param: "value" })
```

### Error Handling

Use the `BaseError` class for custom errors:

```typescript
import { BaseError } from "@/core/lib/error"

class MyCustomError extends BaseError {
  constructor() {
    super("Descriptive error message")
  }
}
```

### Form Validation

Use Zod schemas for validation:

```typescript
import z from "zod"

export const MySchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
})
export type MyType = z.infer<typeof MySchema>
```

### React Hook Form Integration

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const form = useForm({
  resolver: zodResolver(MySchema),
})
```

### Components Structure

Follow atomic design in `core/components/`:

- `ui/` - Basic UI primitives (button, input, etc.)
- `form/` - Form-related components
- `atoms/` - Simple components
- `molecules/` - Composed components
- `organisms/` - Complex components
- `template/` - Page templates

### ESLint Rules

- Unused variables prefixed with `_` are allowed
- React Compiler rules enforced
- React Hooks rules enforced
- TanStack Query rules enforced

### Files to Ignore

- `**/*.gen.ts` - Generated files
- `**/.astro/` - Astro cache
- `**/.tanstack/` - Router generated files
- `**/dist/` - Build output
- `**/node_modules/`
