import { Button } from "@/core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu"
import { useEditedQuizMenuItems } from "@/quiz/components/molecules/items/edit-quiz-dropdown-menu-items"
import { Link } from "@tanstack/react-router"
import { TbSettings } from "react-icons/tb"

// Component
export function EditQuizSettingsDropdownMenu() {
  const [items, nodes] = useEditedQuizMenuItems()

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
          {items.map(({ icon: Icon, label, ...props }) => {
            const isLink = "to" in props

            if (isLink) {
              return (
                <DropdownMenuItem
                  key={label}
                  {...props}
                  nativeButton={false}
                  render={
                    <Link to={props.to}>
                      <Icon />

                      {label}
                    </Link>
                  }
                />
              )
            }

            return (
              <DropdownMenuItem key={label} {...props} onClick={props.onClick}>
                <Icon />

                {label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {nodes}
    </>
  )
}
