import {
  NativeSelect,
  NativeSelectOption,
} from "@/core/components/ui/native-select"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { useTheme } from "next-themes"

// i18n
const themeOptionMessages = i18nInstance("settings:preferences:options:theme", {
  system: "System",
  light: "Light",
  dark: "Dark",
})

// Component
export function ThemeOption() {
  const messages = useStore(themeOptionMessages)

  // Theme
  const { theme, themes, setTheme } = useTheme()

  return (
    <NativeSelect
      className="w-full"
      defaultValue={theme}
      onChange={(e) => {
        setTheme(e.target.value)
      }}
    >
      {themes.map((value) => (
        <NativeSelectOption key={value} value={value}>
          {messages[value as keyof typeof messages] || value}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
