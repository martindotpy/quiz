import { Separator } from "@/core/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/core/components/ui/tabs"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { Link, useLocation } from "@tanstack/react-router"

// i18n
const tabsMessages = i18nInstance("settings:tabs", {
  preferences: "Preferences",
})

// Tabs
interface Tab {
  label: string
  to: LinkRoute
}

function useTabs(): Tab[] {
  const messages = useStore(tabsMessages)

  return [
    {
      to: "/{-$locale}/settings/preferences",
      label: messages.preferences,
    },
  ]
}

// Component
export function SettingsTabs() {
  // Pathname
  const { pathname } = useLocation()

  // Tab
  const tabs = useTabs()
  const [tabValue] = pathname.split("/").slice(-1)

  return (
    <div>
      <Tabs value={tabValue}>
        <TabsList variant="line">
          {tabs.map(({ to, label }) => (
            <TabsTrigger
              key={to}
              className="text-base"
              value="preferences"
              nativeButton={false}
              render={<Link to={to}>{label}</Link>}
            />
          ))}
        </TabsList>
      </Tabs>

      <Separator />
    </div>
  )
}
