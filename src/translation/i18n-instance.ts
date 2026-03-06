import {
  getFormatterInstance,
  getI18nInstance,
} from "astro-nanostores-i18n:runtime"

export const i18nInstance = getI18nInstance()
export const formatterInstance = getFormatterInstance()
