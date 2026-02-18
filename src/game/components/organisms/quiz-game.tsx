import { Item, ItemContent, ItemDescription } from "@/core/components/ui/item"
import { shuffle } from "@/core/lib/array"
import { GameSummary } from "@/game/components/organisms/game-summary"
import { QuestionMultimediaGame } from "@/game/components/organisms/question-multimedia-game"
import { TimeBar } from "@/game/components/organisms/time-bar"
import type { QuestionResponse } from "@/game/types/quiz-response-types"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import type { QuestionAnswer, QuizQuestion } from "@/quiz/model/quiz-model"
import { useEffect, useMemo, useState } from "react"

// Component
export function QuizGame() {
  // Quiz
  const { currentQuiz } = useCurrentQuiz()

  // Current questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // Shuffle questions once per quiz (use the quiz id as the dependency)
  const questions = useMemo(
    () => shuffle(currentQuiz.questions),
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQuiz.id]
  )
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
  const [questionResponses, setQuestionResponses] = useState<
    QuestionResponse[]
  >([])

  const handleAnswer = (question: QuizQuestion, answer: QuestionAnswer) => {
    if (answer.isCorrect) setScore((score) => score + 1)

    // Store only the shape defined by QuestionResponse (question + selected)
    setQuestionResponses((answers) => [
      ...answers,
      { question, selected: answer },
    ])

    setCurrentQuestionIndex((index) => index + 1)
  }

  // Grid rows
  // TODO: Change it to dynamic rows based on the image
  const rows = 3

  if (!currentQuestion) {
    return <GameSummary score={score} responses={questionResponses} />
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
              key={`${answer.text}-${index}`}
              variant="outline"
              className="min-h-16 cursor-pointer"
              onClick={() => handleAnswer(currentQuestion, answer)}
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
