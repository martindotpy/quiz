import { Button } from "@/core/components/ui/button"
import { cn } from "@/core/lib/tailwind"
import { counterStore, INITIAL_COUNTER_VALUE } from "@/game/store/counter-store"
import { scoreStore } from "@/game/store/quiz-score-store"
import type { QuestionResponse } from "@/game/types/quiz-response-types"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { TbCheck, TbEye, TbEyeOff, TbRefresh, TbX } from "react-icons/tb"

// i18n
const quizGameSummaryMessages = i18nInstance("quiz:game:summary", {
  score: params("Your score is {score}"),
  playAgain: "Play again",
  showResponses: "Show Responses",
  hideResponses: "Hide Responses",
  yourAnswer: "Your answer",
  correctAnswers: "Correct answers",
  responses: "Responses",
  accuracy: params("{percentage}% accuracy"),
  excellent: "Excellent",
  great: "Great",
  good: "Good",
  keepTrying: "Keep trying",
})

// Component
interface GameSummaryProps {
  score: number
  responses: QuestionResponse[]
}

export function GameSummary({ score, responses }: GameSummaryProps) {
  const messages = useStore(quizGameSummaryMessages)

  // Current quiz
  const { currentQuiz } = useCurrentQuiz()
  const totalQuestions = currentQuiz.questions.length
  const scorePercentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  // Update the high score if the current score is higher
  useEffect(() => {
    const quizScore = scoreStore.get()

    let updatedQuizScore = quizScore[currentQuiz.id]

    if (updatedQuizScore?.totalQuestions !== totalQuestions) {
      updatedQuizScore = {
        maxScore: score,
        lastScore: score,
        totalQuestions,
      }
    } else {
      updatedQuizScore = {
        maxScore: Math.max(updatedQuizScore.maxScore, score),
        lastScore: score,
        totalQuestions,
      }
    }

    scoreStore.set({
      ...quizScore,
      [currentQuiz.id]: updatedQuizScore,
    })
  }, [currentQuiz.id, totalQuestions, score])

  // Play again
  const handlePlayAgain = () => {
    counterStore.set(INITIAL_COUNTER_VALUE)
  }

  // Show responses
  const [showResponses, setShowResponses] = useState(false)

  // Grade
  const getScoreGrade = (percentage: number) => {
    if (percentage >= 90)
      return {
        label: messages.excellent,
        className: "text-emerald-600 dark:text-emerald-400",
      }
    if (percentage >= 70)
      return {
        label: messages.great,
        className: "text-sky-600 dark:text-sky-400",
      }
    if (percentage >= 50)
      return {
        label: messages.good,
        className: "text-amber-600 dark:text-amber-400",
      }

    return {
      label: messages.keepTrying,
      className: "text-rose-600 dark:text-rose-400",
    }
  }

  const grade = getScoreGrade(scorePercentage)

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="to-muted/30 flex flex-col items-center gap-6 border bg-linear-to-b from-transparent p-8">
          <div className="flex items-baseline gap-1">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-8xl tracking-tighter tabular-nums"
            >
              {score}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="text-muted-foreground text-3xl font-light"
            >
              /{totalQuestions}
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className={cn(
                "text-sm font-medium tracking-widest uppercase",
                grade.className
              )}
            >
              {grade.label}
            </span>
            <span className="text-muted-foreground text-xs tabular-nums">
              {messages.accuracy({ percentage: scorePercentage })}
            </span>
          </motion.div>

          <Button onClick={handlePlayAgain} className="w-full gap-2">
            <TbRefresh />
            {messages.playAgain}
          </Button>
        </div>
      </motion.div>

      {showResponses ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium tracking-tight">
              {messages.responses}
            </h2>
            <Button onClick={() => setShowResponses(false)}>
              <TbEyeOff className="size-4" />
              {messages.hideResponses}
            </Button>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {responses.map((response, index) => (
              <ResponseCard
                key={`${response.question.title}-${index}`}
                response={response}
                index={index}
                messages={messages}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setShowResponses(true)}
          className="ml-auto gap-2"
        >
          <TbEye className="size-4" />
          {messages.showResponses}
        </Button>
      )}
    </div>
  )
}

// Response card
interface ResponseCardProps {
  response: QuestionResponse
  index: number
  messages: ReturnType<typeof useStore<typeof quizGameSummaryMessages>>
}

function ResponseCard({ response, index, messages }: ResponseCardProps) {
  // State
  const isCorrect = response.selected.isCorrect
  const correctAnswers = response.question.answers.filter((a) => a.isCorrect)
  const hasMultipleCorrectAnswers = correctAnswers.length > 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden border transition-colors duration-200",
        {
          "border-emerald-200/50 bg-emerald-50/30 dark:border-emerald-900/30 dark:bg-emerald-950/20":
            isCorrect,
          "border-rose-200/50 bg-rose-50/30 dark:border-rose-900/30 dark:bg-rose-950/20":
            !isCorrect,
        }
      )}
    >
      <div className="flex gap-4 p-5">
        <div className="flex flex-col items-center gap-2 pt-0.5">
          <span className="text-muted-foreground/50 text-xs font-medium tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div
            className={cn(
              "flex size-6 items-center justify-center rounded-full border",
              {
                "border-emerald-300 bg-emerald-100 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-400":
                  isCorrect,
                "border-rose-300 bg-rose-100 text-rose-600 dark:border-rose-800 dark:bg-rose-900/50 dark:text-rose-400":
                  !isCorrect,
              }
            )}
          >
            {isCorrect ? (
              <TbCheck className="size-3.5" />
            ) : (
              <TbX className="size-3.5" />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed font-medium">
            {response.question.title}
          </p>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground/70 text-xs font-medium tracking-wide uppercase">
                {messages.yourAnswer}
              </span>
              <span
                className={cn(
                  "text-sm leading-relaxed",
                  isCorrect
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-rose-700 dark:text-rose-400"
                )}
              >
                {response.selected.text}
              </span>
            </div>

            {(!isCorrect || hasMultipleCorrectAnswers) && (
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground/70 text-xs font-medium tracking-wide uppercase">
                  {messages.correctAnswers}
                </span>

                <ul className="flex flex-col gap-1">
                  {correctAnswers.map((answer, aIndex) => (
                    <li
                      key={`${answer.text}-${aIndex}`}
                      className="list-disc text-sm leading-relaxed text-emerald-700 dark:text-emerald-400"
                    >
                      {answer.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
