import { i18nInstance } from "@/translation/kit/i18n-kit"
import {
  localeParamStore,
  localePreferenceStore,
} from "@/translation/store/i18n-store"
import type { Translations } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import { currentLocale as currentLocaleStore } from "astro-nanostores-i18n:runtime"

// Hooks
export function useI18n<Body extends Translations>(
  componentName: string,
  baseTranslations: Body
): Body {
  const body = useStore(i18nInstance(componentName, baseTranslations))

  return body
}

export function useLocalePreference() {
  const localePreference = useStore(localePreferenceStore)

  return localePreference
}

export function useLocaleParam() {
  const localeParam = useStore(localeParamStore)

  return localeParam
}

export function useCurrentLocale() {
  const currentLocale = useStore(currentLocaleStore)

  return currentLocale
}
