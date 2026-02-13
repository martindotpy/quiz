import { AiQuestionGeneratorPage } from "@/ai/components/templates/ai-question-generator-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/{-$locale}/_main/quiz/new/ai")({
  component: AiQuestionGeneratorPage,
  staticData: {
    aiMode: true,
  },
})
