import { quizCollection } from "@/quiz/collection/quiz-collection"
import { Quiz } from "@/quiz/model/quiz-model"
import { currentQuizStore } from "@/quiz/store/current-quiz-store"
import { editQuizStore, resetEditedQuiz } from "@/quiz/store/edit-quiz-store"
import { createFileRoute, notFound } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId")({
  loader: ({ params }) => {
    const { quizId: rawQuizId } = params

    // Check if the quizId is valid
    const { success, data: quizId } = Quiz.shape.id.safeParse(rawQuizId)

    if (!success) {
      throw notFound()
    }

    // Find the quiz by its ID
    const quiz = quizCollection.get(quizId)

    if (!quiz) {
      throw notFound()
    }

    // Add the store to the current quiz store store
    if (quiz.id !== editQuizStore.get()?.id) {
      editQuizStore.set(quiz)
    }

    currentQuizStore.set({
      quizStore: editQuizStore,
      resetQuizStore: resetEditedQuiz,
    })

    return { quiz }
  },
})
