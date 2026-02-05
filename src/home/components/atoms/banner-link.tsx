import { useLocaleParam } from "@/translation/hook/i18n-hook"
import Favicon from "@assets/svg/favicon.svg?react"
import { Link } from "@tanstack/react-router"

// Component
export function BannerLink() {
  // Locale
  const localeParam = useLocaleParam()

  return (
    <Link to="/{-$locale}" params={{ locale: localeParam }} className="p-4">
      <Favicon className="size-8" />
    </Link>
  )
}
