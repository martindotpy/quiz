import { shuffle } from "@/core/lib/array"
import { cn } from "@/core/lib/tailwind"
import { GameSummary } from "@/game/components/organisms/game-summary"
import { QuestionMultimediaGame } from "@/game/components/organisms/question-multimedia-game"
import { TimeBar } from "@/game/components/organisms/time-bar"
import type { QuestionResponse } from "@/game/types/quiz-response-types"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import type { QuestionAnswer, QuizQuestion } from "@/quiz/model/quiz-model"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import { TbArrowRight, TbCheck, TbX } from "react-icons/tb"

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
  const answers = useMemo(
    () => shuffle(currentQuestion?.answers ?? []),
    [currentQuestion]
  )
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

  // Responses
  const [questionResponses, setQuestionResponses] = useState<
    QuestionResponse[]
  >([])

  // Handle answer selection
  const [selectedAnswer, setSelectedAnswer] = useState<QuestionAnswer | null>(
    null
  )

  const handleAnswer = (question: QuizQuestion, answer: QuestionAnswer) => {
    if (selectedAnswer) return

    setSelectedAnswer(answer)

    setTimeout(() => {
      if (answer.isCorrect) setScore((score) => score + 1)

      setQuestionResponses((answers) => [
        ...answers,
        { question, selected: answer },
      ])

      setCurrentQuestionIndex((index) => index + 1)
      setSelectedAnswer(null)
    }, 400)
  }

  const rows = currentQuestion?.multimedia ? 3 : 2

  if (!currentQuestion) {
    return <GameSummary score={score} responses={questionResponses} />
  }

  return (
    <>
      <TimeBar maxTimeSeconds={timeLimitSeconds} index={currentQuestionIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="max-h-main-h no-scrollbar grid flex-1 gap-4 overflow-y-scroll pt-4 select-none"
          style={{
            gridTemplateRows: rows === 3 ? "auto 1fr auto" : "1fr auto",
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-3">
              <span className="text-muted-foreground/40 text-xs font-medium tracking-[0.2em] uppercase tabular-nums">
                {String(currentQuestionIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground/20 text-xs">/</span>
              <span className="text-muted-foreground/40 text-xs tracking-[0.2em] uppercase tabular-nums">
                {String(questions.length).padStart(2, "0")}
              </span>
            </div>
            <h2 className="flex flex-1 items-center justify-center text-center text-xl leading-relaxed font-medium tracking-tight md:text-2xl">
              {currentQuestion.title}
            </h2>
          </div>

          {currentQuestion.multimedia && (
            <QuestionMultimediaGame multimedia={currentQuestion.multimedia} />
          )}

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {answers.map((answer, index) => (
              <AnswerCard
                key={`${answer.text}-${index}`}
                answer={answer}
                index={index}
                selectedAnswer={selectedAnswer}
                onSelect={() => handleAnswer(currentQuestion, answer)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// Answer card
interface AnswerCardProps {
  answer: QuestionAnswer
  index: number
  selectedAnswer: QuestionAnswer | null
  onSelect: () => void
}

function AnswerCard({
  answer,
  index,
  selectedAnswer,
  onSelect,
}: AnswerCardProps) {
  // State
  const isSelected = selectedAnswer?.text === answer.text
  const showResult = selectedAnswer !== null
  const isCorrect = answer.isCorrect

  return (
    <motion.button
      transition={{ delay: 0.15 + index * 0.05, duration: 0.2 }}
      onClick={onSelect}
      disabled={selectedAnswer !== null}
      className={cn(
        "group flex min-h-16 w-full cursor-pointer items-center gap-3 border px-4 py-3 text-left transition-all duration-200 disabled:cursor-default",
        {
          "focus-visible:ring-ring/50 hover:border-foreground/20 hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-offset-2":
            !showResult,
          "border-emerald-500/50 bg-emerald-50 dark:border-emerald-400/30 dark:bg-emerald-950/30":
            isSelected && isCorrect,
          "border-rose-500/50 bg-rose-50 dark:border-rose-400/30 dark:bg-rose-950/30":
            isSelected && !isCorrect,
          "border-emerald-500/30 bg-emerald-50/50 dark:border-emerald-400/20 dark:bg-emerald-950/20":
            showResult && !isSelected && isCorrect,
        }
      )}
    >
      <span
        className={cn(
          "text-muted-foreground/30 flex size-6 items-center justify-center text-xs font-medium uppercase transition-colors",
          {
            "text-current opacity-60": isSelected || (showResult && isCorrect),
          }
        )}
      >
        {String.fromCharCode(65 + index)}
      </span>

      <span
        className={cn(
          "flex-1 text-sm leading-relaxed font-medium transition-colors",
          {
            "text-foreground": isSelected || (showResult && isCorrect),
          }
        )}
      >
        {answer.text}
      </span>

      {!showResult && (
        <TbArrowRight className="text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all" />
      )}

      {showResult && isCorrect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-emerald-500 dark:text-emerald-400"
        >
          <TbCheck />
        </motion.div>
      )}

      {isSelected && !isCorrect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-rose-500 dark:text-rose-400"
        >
          <TbX />
        </motion.div>
      )}
    </motion.button>
  )
}
