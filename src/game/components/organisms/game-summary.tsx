import { Button } from "@/core/components/ui/button"
import { Progress } from "@/core/components/ui/progress"
import { counterStore, INITIAL_COUNTER_VALUE } from "@/game/store/counter-store"
import { scoreStore } from "@/game/store/quiz-score-store"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import { useEffect } from "react"

// i18n
const quizGameSummaryMessages = i18nInstance("quiz:game:summary", {
  score: params("Your score is {score}"),
  playAgain: "Play again",
})

// Component
interface GameSummaryProps {
  score: number
}

export function GameSummary({ score }: GameSummaryProps) {
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
  }, [currentQuiz, totalQuestions, score])

  // Plat again
  const handlePlayAgain = () => {
    counterStore.set(INITIAL_COUNTER_VALUE)
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-6 border p-6 md:p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-muted-foreground text-sm">
            {messages.score({ score })}.
          </p>

          <p className="text-foreground text-5xl leading-none font-bold md:text-6xl">
            {score}
            <span className="text-muted-foreground ml-1 text-2xl font-semibold md:text-3xl">
              /{totalQuestions}
            </span>
          </p>

          <p className="text-primary text-sm font-medium">{scorePercentage}%</p>
        </div>

        <Progress value={scorePercentage} />

        <Button onClick={handlePlayAgain} className="w-full">
          {messages.playAgain}
        </Button>
      </div>
    </div>
  )
}
