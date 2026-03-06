import { Link } from "@/core/components/ui/link"
import { useLocaleParam } from "@/translation/hook/i18n-hook"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"

// i18n
const createQuizLinkMessages = i18nInstance("quiz:link:create", {
  create: "Create",
})

// Component
export function CreateQuizLink() {
  const messages = useStore(createQuizLinkMessages)

  // Locale
  const localeParam = useLocaleParam()

  return (
    <Link
      variant="secondary"
      to="/{-$locale}/quiz/new"
      params={{ locale: localeParam }}
    >
      {messages.create}
    </Link>
  )
}
