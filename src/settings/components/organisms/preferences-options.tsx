import { Separator } from "@/core/components/ui/separator"
import { AiChatSelect } from "@/settings/components/molecules/ai-chat-select"
import { LanguageOptionSelect } from "@/settings/components/molecules/language-option-select"
import { ThemeOptionSelect } from "@/settings/components/molecules/theme-option-select"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import type { IconType } from "react-icons/lib"
import { TbAdjustments, TbLanguage, TbSparkles } from "react-icons/tb"
import { Fragment } from "react/jsx-runtime"

// i18n
const preferencesMessages = i18nInstance("settings:preferences:options", {
  aiTitle: "Ai Chat",
  aiDescription:
    "Configure the artificial intelligence options that suit your preference.",
  aiLabel: "Ai Chat Provider",
  languageTitle: "Language",
  languageDescription: "Select your preferred language for the application.",
  languageLabel: "Preferred language",
  themeTitle: "Theme",
  themeDescription: "Choose between light, dark, or system default theme.",
  themeLabel: "Theme mode",
})

// Preferences
interface Option {
  label: string
  node: React.ReactNode
}

interface Preference {
  icon: IconType
  title: string
  description: string
  options: Option[]
}

function usePreferences(): Preference[] {
  const messages = useStore(preferencesMessages)

  return [
    {
      icon: TbSparkles,
      title: messages.aiTitle,
      description: messages.aiDescription,
      options: [
        {
          label: messages.aiLabel,
          node: <AiChatSelect />,
        },
      ],
    },
    {
      icon: TbLanguage,
      title: messages.languageTitle,
      description: messages.languageDescription,
      options: [
        {
          label: messages.languageLabel,
          node: <LanguageOptionSelect />,
        },
      ],
    },
    {
      icon: TbAdjustments,
      title: messages.themeTitle,
      description: messages.themeDescription,
      options: [
        {
          label: messages.themeLabel,
          node: <ThemeOptionSelect />,
        },
      ],
    },
  ]
}

// Component
export function PreferencesOptions() {
  const preferences = usePreferences()

  return (
    <div className="mt-3 flex flex-col gap-4">
      {preferences.map(({ title, icon: Icon, description, options }) => (
        <Fragment key={title}>
          <Separator />

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {<Icon className="size-5" />}

              <h2 className="font-semibold">{title}</h2>
            </div>

            <p className="text-muted-foreground mb-2 text-sm">{description}</p>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {options.map(({ label, node }) => (
                <div key={label}>
                  <span className="text-sm">{label}</span>

                  {node}
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
