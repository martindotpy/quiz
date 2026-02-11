import { getTitle } from "@/core/kit/title-kit"
import { titleMessages } from "@/core/translation/title-translation"
import { currentQuizStore } from "@/quiz/store/current-quiz-store"
import { draftQuizStore, resetDraftQuiz } from "@/quiz/store/draft-quiz-store"
import { getLocaleParam } from "@/translation/kit/i18n-kit"
import { localePreferenceStore } from "@/translation/store/i18n-store"
import { createFileRoute, redirect } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/new")({
  head: () => ({ meta: [{ title: getTitle(titleMessages.get().new) }] }),
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/new"))
      throw redirect({
        to: "/{-$locale}/quiz/new/$questionId",
        params: {
          locale: getLocaleParam(localePreferenceStore.get()),
          questionId: "1",
        },
      })

    currentQuizStore.set({
      quizStore: draftQuizStore,
      resetQuizStore: resetDraftQuiz,
    })
  },
  staticData: {
    creationMode: true,
  },
})
