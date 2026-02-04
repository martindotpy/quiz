import { getTitle } from "@/core/kit/title-kit"
import { titleMessages } from "@/core/translation/title-translation"
import { PreferencesOptions } from "@/settings/components/organisms/preferences-options"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { createFileRoute } from "@tanstack/react-router"

// i18n
const settingsPreferenceMessages = i18nInstance("settings:preferences", {
  description: "Enhance your experience by adjusting your preferences.",
})

// Route
export const Route = createFileRoute("/{-$locale}/_main/settings/preferences")({
  head: () => ({
    meta: [{ title: getTitle(titleMessages.get()["settings/preferences"]) }],
  }),
  component: SettingsPreferenceComponent,
})

function SettingsPreferenceComponent() {
  const messages = useStore(settingsPreferenceMessages)

  return (
    <>
      <p className="text-muted-foreground text-sm">{messages.description}</p>

      <PreferencesOptions />
    </>
  )
}
