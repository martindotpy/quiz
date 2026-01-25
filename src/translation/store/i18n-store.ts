import { isSsr } from "@/core/configuration/app-configuration"
import {
  defaultLocale,
  type Locale,
} from "@/core/configuration/i18n-configuration"
import { getLocaleParam, isNonDefaultLocale } from "@/translation/kit/i18n-kit"
import { persistentAtom } from "@nanostores/persistent"
import { currentLocale } from "astro-nanostores-i18n:runtime"
import { computed } from "nanostores"

export const localePreferenceStore = persistentAtom<Locale>("locale")

// Initialize the locale settings on the client side
if (!isSsr && !localePreferenceStore.get()) {
  // Get the locale from the URL pathname
  const { pathname } = location
  const currentPathname = pathname.endsWith("/") ? pathname : pathname + "/"
  const [rawLocale] = currentPathname.split("/").slice(1, 2)

  // Determine the locale
  const locale = isNonDefaultLocale(rawLocale) ? rawLocale : defaultLocale

  // Set the locale
  localePreferenceStore.set(locale)
}

if (isSsr)
  currentLocale.subscribe((locale) => {
    localePreferenceStore.set(locale as Locale)
  })
else {
  currentLocale.set(localePreferenceStore.get())
  localePreferenceStore.subscribe((locale) => {
    document.documentElement.lang = locale
  })
}

export const localeParamStore = computed(localePreferenceStore, getLocaleParam)
