import {
  defaultLocale,
  nonDefaultLocales,
  type Locale,
  type NonDefaultLocale,
} from "../../core/configuration/i18n-configuration"

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
 * Replaces the locale segment in a given path with a new locale. If the new locale is the default locale, it removes any existing locale segment from the path.
 *
 * @param path - The original path that may contain a locale segment.
 * @param newLocale - The new locale to replace in the path. If this is the default locale, any existing locale segment will be removed.
 * @returns The modified path with the new locale segment, or without any locale segment if the new locale is the default locale.
 */
export function replaceLocaleInPath(path: string, newLocale: Locale) {
  // Normalize the path to ensure it starts with a slash and split it into segments
  const normalized = path.startsWith("/") ? path : `/${path}`

  // Extract the first segment to check for an existing locale
  const segments = normalized.split("/").slice(1)
  const [first] = segments
  const hasLocale = isNonDefaultLocale(first)

  // Reconstruct the path with the new locale, preserving the rest of the segments
  const restSegments = segments.slice(hasLocale ? 1 : 0).filter(Boolean)
  const rest = restSegments.join("/")

  if (newLocale === defaultLocale) {
    return rest ? `/${rest}` : "/"
  }

  return rest ? `/${newLocale}/${rest}` : `/${newLocale}`
}

/**
 * Retrieves the locale parameter for routing based on the provided locale.
 * @param locale - The locale to evaluate.
 * @returns The locale parameter if it's a non-default locale; otherwise, `undefined`.
 */
export function getLocaleParam(locale: string) {
  return isNonDefaultLocale(locale) ? locale : undefined
}
