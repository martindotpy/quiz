import { getTitle } from "@/core/kit/title-kit"
import { titleMessages } from "@/core/translation/title-translation"
import { createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/new")({
  head: () => ({ meta: [{ title: getTitle(titleMessages.get().new) }] }),
  staticData: {
    creationMode: true,
  },
  component: NewComponent,
})

function NewComponent() {
  return null
}
