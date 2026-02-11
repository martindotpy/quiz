import { appName, defaultTitle } from "@/core/constant/seo-constant"

// Utils
export function getTitle(title?: string) {
  return title ? `${appName} | ${title}` : defaultTitle
}
