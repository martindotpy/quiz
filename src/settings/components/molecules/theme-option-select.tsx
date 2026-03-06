import {
  NativeSelect,
  NativeSelectOption,
} from "@/core/components/ui/native-select"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

// i18n
const themeOptionMessages = i18nInstance("settings:preferences:options:theme", {
  system: "System",
  light: "Light",
  dark: "Dark",
})

// Component
export function ThemeOptionSelect() {
  const messages = useStore(themeOptionMessages)

  // Theme
  const { theme, themes, setTheme } = useTheme()

  // Select
  const selectRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (!selectRef.current) return

    selectRef.current.value = theme || "system"
  }, [theme])

  return (
    <NativeSelect
      ref={selectRef}
      className="w-full"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      {themes.map((value) => (
        <NativeSelectOption key={value} value={value}>
          {messages[value as keyof typeof messages] || value}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
