import {
  NativeSelect,
  NativeSelectOption,
} from "@/core/components/ui/native-select"
import type { Locale } from "@/core/configuration/i18n-configuration"
import { useLocalePreference } from "@/translation/hook/i18n-hook"
import { localePreferenceStore } from "@/translation/store/i18n-store"

// Languages
interface LanguageOption {
  label: string
  value: Locale
}

const languageOptions: LanguageOption[] = [
  { label: "🇺🇸 English", value: "en" },
  { label: "🇵🇪 Español", value: "es" },
]

// Component
export function LanguageOptionSelect() {
  // Locale
  const localePreference = useLocalePreference()

  return (
    <NativeSelect
      className="w-full"
      defaultValue={localePreference}
      onChange={(e) => {
        localePreferenceStore.set(e.target.value as Locale)
      }}
    >
      {languageOptions.map(({ label, value }) => (
        <NativeSelectOption key={value} value={value}>
          {label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
