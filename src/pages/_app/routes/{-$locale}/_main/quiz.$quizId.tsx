import { Link } from "@/core/components/ui/link"
import { useScore } from "@/game/hook/use-score"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { Quiz } from "@/quiz/model/quiz-model"
import { currentQuizStore } from "@/quiz/store/current-quiz-store"
import { editQuizStore, resetEditedQuiz } from "@/quiz/store/edit-quiz-store"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import {
  createFileRoute,
  notFound,
  Outlet,
  useMatches,
} from "@tanstack/react-router"
import { motion } from "motion/react"
import { TbPlayerPlayFilled } from "react-icons/tb"

// i18n
const quizPrePlayMessages = i18nInstance("quiz:pre-start", {
  button: "Let's start!",
  lastScore: "Your last score",
  bestScore: "Your best score",
  outOf: "out of",
})

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId")({
  beforeLoad: ({ params }) => {
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
  component: QuizComponent,
})

function QuizComponent() {
  const messages = useStore(quizPrePlayMessages)

  // Route id
  const routeId = Route.id

  // Current quiz
  const { quiz } = Route.useRouteContext()

  // Score
  const score = useScore()
  const quizScore = score[quiz.id]

  // Last route
  const lastRoute = useMatches({
    select: (matches) => matches[matches.length - 1]!,
  })

  const isLastRoute = lastRoute.routeId === routeId

  if (!isLastRoute) return <Outlet />

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center gap-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        {quiz.name}
      </h1>

      {quiz.description && (
        <p className="text-accent-foreground text-center">{quiz.description}</p>
      )}

      {quizScore && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-primary text-center text-lg">
            {messages.bestScore}:{" "}
            <span className="text-2xl font-bold">{quizScore.maxScore}</span>{" "}
            {messages.outOf} {quizScore.totalQuestions}
          </p>
          <p>
            {messages.lastScore}:{" "}
            <span className="text-2xl font-bold">{quizScore.lastScore}</span>{" "}
            {messages.outOf} {quizScore.totalQuestions}
          </p>
        </div>
      )}

      <Link
        to="/{-$locale}/quiz/$quizId/play"
        variant="default"
        className="mt-2 w-full max-w-32 md:mt-4"
      >
        {messages.button} <TbPlayerPlayFilled />
      </Link>
    </motion.div>
  )
}
