import { Section } from "@/core/components/organisms/section"
import { Link } from "@/core/components/ui/link"
import { useLocaleParam } from "@/translation/hook/i18n-hook"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"

// i18n
const notFoundMessages = i18nInstance("not-found:main", {
  title: "Oops!",
  description:
    "The page you're looking for doesn't exist or has been moved. Please check the URL and try again.",
  backToHome: "Back to home",
})

// Component
export function NotFoundMainSection() {
  const messages = useStore(notFoundMessages)

  // Locale
  const localePath = useLocaleParam()

  return (
    <Section className="mx-auto flex max-w-xs flex-1 flex-col items-center justify-center gap-4 px-5 py-8">
      <h1 className="text-5xl font-bold">{messages.title}</h1>

      <p className="text-muted-foreground text-pretty">
        {messages.description}
      </p>

      <Link
        variant="default"
        to="/{-$locale}"
        params={{ locale: localePath }}
        className="w-full"
      >
        {messages.backToHome}
      </Link>
    </Section>
  )
}
