import { EditCurrentQuizPage } from "@/quiz/components/templates/edit-current-quiz-page"
import { currentQuestionStore } from "@/quiz/store/current-question-store"
import { editQuizStore } from "@/quiz/store/edit-quiz-store"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { computed } from "nanostores"

// Route
export const Route = createFileRoute(
  "/{-$locale}/_main/quiz/$quizId/edit/$questionId"
)({
  beforeLoad: ({ params }) => {
    // Check if the question id is valid
    const { questionId: rawQuestionId } = params
    const questionId = Number(rawQuestionId)

    const quiz = editQuizStore.get()!

    // Redirect to the first question if the id is invalid
    if (
      Number.isNaN(questionId) ||
      questionId < 1 ||
      questionId > quiz.questions.length
    ) {
      throw redirect({
        params: (prevParams) => ({ ...prevParams, questionId: "1" }),
      })
    }

    // There is always one in the quiz
    const questionIndex = questionId - 1
    const questionStore = computed(
      editQuizStore,
      (quiz) => quiz!.questions[questionIndex]!
    )

    currentQuestionStore.set({ questionIndex, questionStore })
  },
  component: EditCurrentQuizPage,
  staticData: {
    manualMode: true,
  },
})
