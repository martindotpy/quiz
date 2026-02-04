import { SettingsTabs } from "@/settings/components/molecules/settings-tabs"
import { getLocaleParam, i18nInstance } from "@/translation/kit/i18n-kit"
import { localePreferenceStore } from "@/translation/store/i18n-store"
import { useStore } from "@nanostores/react"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

// i18n
const settingsMessages = i18nInstance("settings", {
  title: "Settings",
})

// Route
export const Route = createFileRoute("/{-$locale}/_main/settings")({
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/settings"))
      throw redirect({
        to: "/{-$locale}/settings/preferences",
        params: { locale: getLocaleParam(localePreferenceStore.get()) },
      })
  },
  component: SettingsComponent,
})

function SettingsComponent() {
  const messages = useStore(settingsMessages)

  return (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{messages.title}</h1>

        <SettingsTabs />
      </div>

      <Outlet />
    </>
  )
}
