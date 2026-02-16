import { GeneratedPromptStep } from "@/ai/components/organisms/generated-prompt-step"
import { GenerationModeStep } from "@/ai/components/organisms/generation-mode-step"
import { JsonQuizFormStep } from "@/ai/components/organisms/json-quiz-form-step"
import { FieldGroup, FieldSeparator } from "@/core/components/ui/field"
import { Separator } from "@/core/components/ui/separator"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"

// i18n
const aiQuestionGeneratorPageTemplateMessages = i18nInstance(
  "quiz:ai:generator:page",
  {
    title: "Ai Question Generator",
  }
)

// Component
export function AiQuestionGeneratorPage() {
  const messages = useStore(aiQuestionGeneratorPageTemplateMessages)

  return (
    <div className="no-scrollbar overflow-y-auto">
      <h1 className="text-2xl font-bold">{messages.title}</h1>

      <Separator className="my-3" />

      <FieldGroup>
        <GenerationModeStep />
        <FieldSeparator />
        <GeneratedPromptStep />
        <FieldSeparator />
        <JsonQuizFormStep />
      </FieldGroup>
    </div>
  )
}
