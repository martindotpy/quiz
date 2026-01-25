import { Link } from "@/core/components/ui/link"
import { useLocaleParam } from "@/translation/hook/i18n-hook"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"

// i18n
const createQuizMessages = i18nInstance("home:header:create-quiz", {
  create: "Create",
})

// Component
export function CreateQuiz() {
  const messages = useStore(createQuizMessages)

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
