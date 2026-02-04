import { isDev } from "@/core/configuration/app-configuration"
import { tanstackQueryDevtools } from "@/core/devtools/tanstack-query-devtools"
import { tanstackRouterDevtools } from "@/core/devtools/tanstack-router-devtools"
import { getTitle } from "@/core/kit/title-kit"
import { HomeHeader } from "@/home/components/organisms/home-header"
import { TanStackDevtools } from "@tanstack/react-devtools"
import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router"
import type { AstroGlobal } from "astro"

// Route
interface RootRouteContext {
  astro: AstroGlobal | undefined
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({ meta: [{ title: getTitle() }] }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent />

      <HomeHeader />

      <Outlet />

      {/* TIP: Disabled because broke layout */}
      {!isDev && (
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[tanstackRouterDevtools, tanstackQueryDevtools]}
        />
      )}
    </>
  )
}
