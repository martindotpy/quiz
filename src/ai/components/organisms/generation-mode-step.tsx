import { useGenerationModeStepItems } from "@/ai/components/organisms/items/generation-mode-step-items"
import { useAiGenerationMode } from "@/ai/hook/use-ai-generation-mode"
import {
  aiGenerationModeStore,
  type AiGenerationMode,
} from "@/ai/store/ai-generation-mode-store"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/core/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"

// i18n
const generationModeStepMessages = i18nInstance("quiz:ai:generator:mode-step", {
  title: "Generation Mode",
  description: "Choose the mode for generating questions.",
})

// Component
export function GenerationModeStep() {
  const messages = useStore(generationModeStepMessages)

  // Items
  const items = useGenerationModeStepItems()

  // Generation mode
  const aiGenerationMode = useAiGenerationMode()

  return (
    <FieldSet>
      <FieldLegend variant="label">{messages.title}</FieldLegend>
      <FieldDescription>{messages.description}</FieldDescription>

      <RadioGroup
        value={aiGenerationMode}
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        onValueChange={(value) => {
          aiGenerationModeStore.set(value as AiGenerationMode)
        }}
      >
        {Object.entries(items).map(([key, item]) => (
          <FieldLabel key={key} htmlFor={key}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>
                  <item.icon />

                  {item.title}
                </FieldTitle>
                <FieldDescription>{item.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem id={key} value={key} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
