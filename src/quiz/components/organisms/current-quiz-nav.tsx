import { Button } from "@/core/components/ui/button"
import { cn } from "@/core/lib/tailwind"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { useCurrentQuestion } from "@/quiz/hook/use-current-question"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { useMode } from "@/quiz/hook/use-mode"
import { getDefaultDraftQuestion } from "@/quiz/store/draft-quiz-store"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { TbPhoto, TbPlus, TbQuestionMark } from "react-icons/tb"

// Styles
const extraButtonClassName = cn("h-20 w-8 transition-none", "md:h-8 md:w-full")

// Component
export function CurrentQuizNav() {
  // Mode
  const { isCreationMode } = useMode()

  // Link
  const questionTo: LinkRoute = isCreationMode
    ? "/{-$locale}/quiz/new/$questionId"
    : "/{-$locale}/quiz/$quizId/edit/$questionId"

  // Current quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Navigate
  const navigate = useNavigate()

  // Question
  const { questionIndex } = useCurrentQuestion()

  // Scroll to the question
  const questionRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ block: "center" })
    }
  }, [questionIndex])

  // Add quiz
  const addQuiz = () => {
    const newQuestions = [...currentQuiz.questions, getDefaultDraftQuestion()]

    setCurrentQuiz({
      ...currentQuiz,
      questions: newQuestions,
    })

    navigate({
      to: questionTo,
      params: (prevParams) => ({
        ...prevParams,
        questionId: (currentQuiz.questions.length + 1).toString(),
      }),
      viewTransition: false,
    })
  }

  return (
    <nav>
      <ul
        className={cn(
          "no-scrollbar flex gap-2 overflow-x-auto transition-none select-none",
          "md:max-h-full md:flex-col md:overflow-x-hidden md:overflow-y-auto"
        )}
      >
        {currentQuiz.questions.map((question, i) => {
          const isCurrentQuestion = i === questionIndex

          return (
            <li
              ref={isCurrentQuestion ? questionRef : null}
              key={i}
              className={cn(
                "bg-card relative flex min-h-20 max-w-32 min-w-32 border",
                isCurrentQuestion && "outline-3 -outline-offset-3"
              )}
            >
              <Link
                to={questionTo}
                params={(prevParams) => ({
                  ...prevParams,
                  questionId: (i + 1).toString(),
                })}
                className="flex-1"
                viewTransition={false}
                preload={false}
              >
                <div className="m-2 line-clamp-1 flex-1 text-center text-xs break-all">
                  {question.title}
                </div>

                <TbPhoto className="text-muted-foreground mx-auto size-8" />

                <div className="absolute bottom-0 left-0 flex items-center gap-0.5 bg-[radial-gradient(100%_120%_at_0%_120%,rgba(0,0,0,0.08)_55%,rgba(0,0,0,0))] px-1 text-sm dark:bg-[radial-gradient(100%_120%_at_0%_120%,rgba(32,32,32,0.8)_55%,rgba(0,0,0,0))]">
                  <TbQuestionMark />

                  {i + 1}
                </div>
              </Link>
            </li>
          )
        })}

        <li className={extraButtonClassName}>
          <Button className={extraButtonClassName} onClick={addQuiz}>
            <TbPlus />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
