import { Devtools } from "@/core/devtools/devtools"
import { getTitle } from "@/core/kit/title-kit"
import { HomeHeader } from "@/home/components/organisms/home-header"
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

      <Devtools />
    </>
  )
}
