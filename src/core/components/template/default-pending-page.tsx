import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { TbLoader } from "react-icons/tb"

// i18n
const defaultPendingPageMessages = i18nInstance("pending", {
  loading: "Loading...",
})

// Component
export function DefaultPendingPage() {
  const messages = useStore(defaultPendingPageMessages)

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-2">
      <TbLoader className="size-14 animate-spin" />
      {messages.loading}
    </div>
  )
}
