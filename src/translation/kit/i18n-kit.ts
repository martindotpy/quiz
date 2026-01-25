import {
  nonDefaultLocales,
  type NonDefaultLocale,
} from "@/core/configuration/i18n-configuration"
import { getI18nInstance } from "astro-nanostores-i18n:runtime"

// Kit

/**
 * Checks whether a value corresponds to a valid locale other than the default locale.
 *
 * @param value - Value to check (may be of any type).
 * @returns `true` if `value` is a recognized `NonDefaultLocale`; `false` otherwise.
 */
export function isNonDefaultLocale(value: unknown): value is NonDefaultLocale {
  return (
    typeof value === "string" &&
    nonDefaultLocales.includes(value as NonDefaultLocale)
  )
}

/**
 * Retrieves the locale parameter for routing based on the provided locale.
 * @param locale - The locale to evaluate.
 * @returns The locale parameter if it's a non-default locale; otherwise, `undefined`.
 */
export function getLocaleParam(locale: string) {
  return isNonDefaultLocale(locale) ? locale : undefined
}

export const i18nInstance = getI18nInstance()
