import { Button } from "@/core/components/ui/button"
import { Item, ItemContent, ItemTitle } from "@/core/components/ui/item"
import { Progress } from "@/core/components/ui/progress"
import { cn } from "@/core/lib/tailwind"
import { counterStore, INITIAL_COUNTER_VALUE } from "@/game/store/counter-store"
import { scoreStore } from "@/game/store/quiz-score-store"
import type { QuestionResponse } from "@/game/types/quiz-response-types"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import { useEffect, useState } from "react"

// i18n
const quizGameSummaryMessages = i18nInstance("quiz:game:summary", {
  score: params("Your score is {score}"),
  playAgain: "Play again",
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
  const totalQuestions = responses.length
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

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
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

      {showResponses ? (
        <>
          <h1 className="text-xl font-semibold">Responses</h1>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {responses.map((response, index) => (
              <Item
                key={`${response.question.title}-${index}`}
                variant="outline"
                className={cn({
                  "border-red-400/40": !response.selected.isCorrect,
                  "border-green-300/40": response.selected.isCorrect,
                })}
              >
                <ItemContent>
                  <ItemTitle className="line-clamp-4">
                    {response.question.title}
                  </ItemTitle>

                  <div className="mt-2 flex flex-col gap-1">
                    <p>
                      Your response: <br />
                      <span className="font-medium">
                        {response.selected.text}
                      </span>
                    </p>

                    {response.question.answers
                      .filter((answer) => answer.isCorrect)
                      .map((answer, aIndex) => (
                        <p key={`${answer.text}-${aIndex}`}>
                          Correct answer: <br />
                          <span className="font-medium">{answer.text}</span>
                        </p>
                      ))}
                  </div>
                </ItemContent>
              </Item>
            ))}
          </div>
        </>
      ) : (
        <Button variant="outline" onClick={() => setShowResponses(true)}>
          Show Responses
        </Button>
      )}
    </div>
  )
}
