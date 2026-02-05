import { Button } from "@/core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu"
import { useNewQuizMenuItems } from "@/quiz/components/molecules/data/new-quiz-dropdown-menu-data"
import { Link } from "@tanstack/react-router"
import { TbSettings } from "react-icons/tb"

// Component
export function NewQuizSettingsDropdownMenu() {
  const [items, nodes] = useNewQuizMenuItems()

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          render={
            <Button size="icon" className="p-1">
              <TbSettings className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          {items.map(({ icon: Icon, label, props, ...item }) => {
            const isButton = "onClick" in item

            if (isButton) {
              return (
                <>
                  <DropdownMenuItem
                    key={label}
                    {...props}
                    onClick={item.onClick}
                  >
                    <Icon />

                    {label}
                  </DropdownMenuItem>
                </>
              )
            }

            return (
              <DropdownMenuItem
                key={label}
                {...props}
                nativeButton={false}
                render={
                  <Link to={item.to}>
                    <Icon />

                    {label}
                  </Link>
                }
              />
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {nodes}
    </>
  )
}
