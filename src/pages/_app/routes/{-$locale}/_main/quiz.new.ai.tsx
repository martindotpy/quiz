import { AiQuestionGeneratorPage } from "@/ai/components/templates/ai-question-generator-page"
import { getTitle } from "@/core/kit/title-kit"
import { titleMessages } from "@/core/translation/title-translation"
import { currentQuizStore } from "@/quiz/store/current-quiz-store"
import { draftQuizStore, resetDraftQuiz } from "@/quiz/store/draft-quiz-store"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/{-$locale}/_main/quiz/new/ai")({
  head: () => ({
    meta: [{ title: getTitle(titleMessages.get()["quiz/new/ai"]) }],
  }),
  component: AiDraftQuizGeneratorComponent,
  staticData: {
    aiMode: true,
  },
})

function AiDraftQuizGeneratorComponent() {
  useEffect(() => {
    currentQuizStore.set({
      quizStore: draftQuizStore,
      resetQuizStore: resetDraftQuiz,
    })
  }, [])

  return <AiQuestionGeneratorPage />
}
