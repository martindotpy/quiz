import { Item, ItemContent, ItemDescription } from "@/core/components/ui/item"
import { shuffle } from "@/core/lib/array"
import { GameSummary } from "@/game/components/organisms/game-summary"
import { QuestionMultimediaGame } from "@/game/components/organisms/question-multimedia-game"
import { TimeBar } from "@/game/components/organisms/time-bar"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { useEffect, useState } from "react"

// Component
export function QuizGame() {
  // Quiz
  const { currentQuiz } = useCurrentQuiz()

  // Current questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions] = useState(shuffle(currentQuiz.questions))
  const currentQuestion = questions[currentQuestionIndex]
  const timeLimitSeconds =
    currentQuestion?.timeLimitSeconds ?? currentQuiz.timeLimitSeconds

  // Next question when time limit is reached
  useEffect(() => {
    if (!currentQuestion) return

    const timeout = setTimeout(() => {
      setCurrentQuestionIndex((index) => index + 1)
    }, timeLimitSeconds * 1000)

    return () => clearTimeout(timeout)
  }, [currentQuestion, timeLimitSeconds])

  // Score
  const [score, setScore] = useState(0)

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((score) => score + 1)
    }

    setCurrentQuestionIndex((index) => index + 1)
  }

  // Grid rows
  // TODO: Change it to dynamic rows based on the image
  const rows = 3

  if (!currentQuestion) {
    return <GameSummary score={score} />
  }

  return (
    <>
      <TimeBar maxTimeSeconds={timeLimitSeconds} index={currentQuestionIndex} />

      <div
        className="mt-2 grid max-h-full flex-1 gap-4 select-none"
        style={{
          gridTemplateRows: `repeat(var(--data-rows), minmax(0, 1fr))`,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          "--data-rows": rows,
        }}
      >
        <div className="flex items-center justify-center">
          <h2 className="text-center text-2xl font-bold">
            {currentQuestion.title}
          </h2>
        </div>

        <QuestionMultimediaGame />

        <div className="grid grid-cols-1 gap-2 overflow-y-scroll md:grid-cols-2">
          {shuffle(currentQuestion.answers).map((answer, index) => (
            <Item
              key={index}
              variant="outline"
              className="min-h-16 cursor-pointer"
              onClick={() => handleAnswer(answer.isCorrect)}
            >
              <ItemContent>
                <ItemDescription>{answer.text}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </div>
    </>
  )
}
