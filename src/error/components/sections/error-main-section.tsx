import { Section } from "@/core/components/organisms/section"
import { Link } from "@/core/components/ui/link"
import { useLocaleParam } from "@/translation/hook/i18n-hook"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"

// i18n
const errorMessages = i18nInstance("error:main", {
  title: "Oops!",
  description:
    "It seems that an unexpected error has occurred. Please try reloading the page.",
  backToHome: "Back to home",
})

// Component
export function ErrorMainSection() {
  const messages = useStore(errorMessages)

  // Locale
  const localeParam = useLocaleParam()

  return (
    <Section className="mx-auto flex max-w-xs flex-1 flex-col items-center justify-center gap-4 px-5 py-8">
      <h1 className="text-5xl font-bold">{messages.title}</h1>

      <p className="text-muted-foreground text-pretty">
        {messages.description}
      </p>

      <Link
        variant="default"
        to="/{-$locale}"
        params={{ locale: localeParam }}
        className="w-full"
      >
        {messages.backToHome}
      </Link>
    </Section>
  )
}
