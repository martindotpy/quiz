import { AiQuestionGeneratorPage } from "@/ai/components/templates/ai-question-generator-page"
import { createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId/edit/ai")({
  component: AiQuestionGeneratorPage,
  staticData: {
    aiMode: true,
  },
})
