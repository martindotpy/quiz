import { GeneratedPrompt } from "@/ai/components/organisms/generated-prompt"
import { JsonQuizFrom } from "@/ai/components/organisms/json-quiz-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/{-$locale}/_main/quiz/new/ai")({
  component: CreateNewQuizWithAiComponent,
  staticData: {
    aiMode: true
  }
})

function CreateNewQuizWithAiComponent() {
  return (
    <div className="no-scrollbar flex flex-col gap-3 overflow-y-auto">
      <GeneratedPrompt />

      <JsonQuizFrom />
    </div>
  )
}
