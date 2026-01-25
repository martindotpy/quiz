import { Button } from "@/core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { Link } from "@tanstack/react-router"
import type { IconType } from "react-icons/lib"
import { TbSettings, TbUser } from "react-icons/tb"

// i18n
const userMenuMessages = i18nInstance("home:header:user-menu", {
  settings: "Settings",
})

// Items
interface UserMenuItem {
  to: LinkRoute
  Icon: IconType
  label: string
}

function useUserMenuItem(): UserMenuItem[] {
  const messages = useStore(userMenuMessages)

  return [
    {
      to: "/{-$locale}/settings",
      Icon: TbSettings,
      label: messages.settings,
    },
  ]
}

// Component
export function UserMenu() {
  // Items
  const items = useUserMenuItem()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <Button
            size="icon"
            nativeButton={false}
            className="p-1"
            render={<TbUser className="size-4" />}
          />
        }
      />

      <DropdownMenuContent align="end">
        {items.map(({ to, Icon, label }) => (
          <DropdownMenuItem
            key={to}
            nativeButton={false}
            render={
              <Link to={to}>
                <Icon />

                {label}
              </Link>
            }
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
