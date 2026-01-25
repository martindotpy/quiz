import {
  defaultLocale,
  type NonDefaultLocale,
} from "@/core/configuration/i18n-configuration"
import { useLocalePreference } from "@/translation/hook/i18n-hook"
import { getLocaleParam, isNonDefaultLocale } from "@/translation/kit/i18n-kit"
import { localePreferenceStore } from "@/translation/store/i18n-store"
import {
  createFileRoute,
  notFound,
  Outlet,
  useNavigate,
} from "@tanstack/react-router"
import { currentLocale } from "astro-nanostores-i18n:runtime"
import { useEffect } from "react"

// Checker
function checkLocale(locale: string | undefined): locale is NonDefaultLocale {
  return locale ? isNonDefaultLocale(locale) : true
}

// Route
export const Route = createFileRoute("/{-$locale}")({
  loader: async ({ params }) => {
    const { locale } = params

    // Check local
    const isValidLocale = checkLocale(locale)

    // 404 if invalid locale
    if (!isValidLocale) throw notFound()
  },
  component: LocaleComponent,
})

function LocaleComponent() {
  // Navigation
  const navigate = useNavigate()

  // Redirect to the preferred locale
  const { locale: localeParam } = Route.useParams()
  const localePreference = useLocalePreference()

  useEffect(() => {
    if (localePreference === (localeParam ?? defaultLocale)) return

    navigate({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      params: (prev) => ({ ...prev, locale: getLocaleParam(localePreference) }),
    })
  }, [localeParam, localePreference, navigate])

  // Update the current locale
  useEffect(() => {
    currentLocale.set(localePreferenceStore.get())
  }, [localeParam])

  return <Outlet />
}
