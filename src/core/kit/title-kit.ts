import { appName, defaultTitle } from "@/core/constant/seo-constant"
import { i18nInstance } from "@/translation/kit/i18n-kit"

// i18n
export const titleMessages = i18nInstance("title", {
  new: "Create new Quiz",
  "settings/preferences": "Preferences",
})

// Utils
export function getTitle(title?: string) {
  return title ? `${title} | ${appName}` : defaultTitle
}
