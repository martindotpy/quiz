// Locales
export const defaultLocale = "en"
export const nonDefaultLocales = ["es"] as const
export const locales = [defaultLocale, ...nonDefaultLocales] as const

export type Locale = (typeof locales)[number]
export type NonDefaultLocale = Exclude<Locale, typeof defaultLocale>
