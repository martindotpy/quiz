import { EditCurrentQuizPage } from "@/quiz/components/templates/edit-current-quiz-page"
import { currentQuestionStore } from "@/quiz/store/current-question-store"
import { draftQuizStore } from "@/quiz/store/draft-quiz-store"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { computed } from "nanostores"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/new/$questionId")({
  beforeLoad: ({ params }) => {
    // Check if the question id is valid
    const { questionId: rawQuestionId } = params
    const questionId = Number(rawQuestionId)
    const draftQuiz = draftQuizStore.get()

    // Redirect to the first question if the id is invalid
    if (
      Number.isNaN(questionId) ||
      questionId < 1 ||
      questionId > draftQuiz.questions.length
    ) {
      throw redirect({
        params: (prevParams) => ({ ...prevParams, questionId: "1" }),
      })
    }

    // There is always one in the draft quiz
    const questionIndex = questionId - 1
    const questionStore = computed(
      draftQuizStore,
      (draftQuiz) => draftQuiz.questions[questionIndex]!
    )

    currentQuestionStore.set({ questionIndex, questionStore })
  },
  component: EditCurrentQuizPage,
  staticData: {
    manualMode: true,
  },
})
