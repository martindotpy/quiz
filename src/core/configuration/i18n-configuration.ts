// Locales
export const defaultLocale = "en"
export const nonDefaultLocales = ["es"] as const
export const locales = [defaultLocale, ...nonDefaultLocales] as const
export const keyValueLocales = locales.reduce((acc, locale) => {
  acc[locale] = locale
  return acc
}, {} as Record<string, string>)

export type Locale = (typeof locales)[number]
export type NonDefaultLocale = Exclude<Locale, typeof defaultLocale>
