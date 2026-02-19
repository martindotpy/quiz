import { AiQuestionGeneratorPage } from "@/ai/components/templates/ai-question-generator-page"
import { getTitle } from "@/core/kit/title-kit"
import { titleMessages } from "@/core/translation/title-translation"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/{-$locale}/_main/quiz/new/ai")({
  head: () => ({
    meta: [{ title: getTitle(titleMessages.get()["new/ai"]) }],
  }),
  component: AiQuestionGeneratorPage,
  staticData: {
    aiMode: true,
  },
})
