import { getLocaleParam } from "@/translation/kit/i18n-kit"
import { localePreferenceStore } from "@/translation/store/i18n-store"
import { createFileRoute, redirect } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/new/manual")({
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/manual"))
      throw redirect({
        to: "/{-$locale}/quiz/new/manual/$questionId",
        params: {
          locale: getLocaleParam(localePreferenceStore.get()),
          questionId: "1",
        },
      })
  },
})
