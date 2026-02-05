import { tanstackQueryDevtools } from "@/core/devtools/tanstack-query-devtools"
import { tanstackRouterDevtools } from "@/core/devtools/tanstack-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

// Component
export function Devtools() {
  return (
    <TanStackDevtools
      config={{
        position: "bottom-right",
      }}
      plugins={[tanstackRouterDevtools, tanstackQueryDevtools]}
    />
  )
}
