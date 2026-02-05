import { Button } from "@/core/components/ui/button"
import { cn } from "@/core/lib/tailwind"
import { Route } from "@/pages/_app/routes/{-$locale}/_main/quiz.new.manual.$questionId"
import { useDraftQuiz } from "@/quiz/hook/use-draft-quiz"
import { Link } from "@tanstack/react-router"
import { TbPlus, TbQuestionMark } from "react-icons/tb"

// Styles
const extraButtonClassName = cn("transition-none max-md:h-24 md:w-full")

// Component
export function NewQuizNav() {
  // Draft quiz
  const { draftQuiz, setDraftQuiz } = useDraftQuiz()

  // Question
  const { questionIndex } = Route.useRouteContext()

  return (
    <nav>
      <ul
        className={cn(
          "flex gap-2 overflow-x-scroll transition-none select-none",
          "md:flex-col md:overflow-x-hidden"
        )}
      >
        {draftQuiz.questions.map((question, i) => (
          <li
            key={i}
            className={cn(
              "bg-card relative flex h-20 w-32 border",
              i === questionIndex && "outline-3 -outline-offset-3"
            )}
          >
            <Link
              to="/{-$locale}/quiz/new/manual/$questionId"
              params={{ questionId: (i + 1).toString() }}
              className="flex-1"
            >
              <div className="m-2 line-clamp-1 flex-1 text-center text-xs break-all">
                {question.title}
              </div>

              <div className="absolute bottom-0 left-0 flex items-center gap-0.5 bg-[radial-gradient(100%_120%_at_0%_120%,rgba(0,0,0,0.08)_55%,rgba(0,0,0,0))] px-1 text-sm dark:bg-[radial-gradient(100%_120%_at_0%_120%,rgba(32,32,32,0.8)_55%,rgba(0,0,0,0))]">
                <TbQuestionMark />

                {i + 1}
              </div>
            </Link>
          </li>
        ))}

        <li className={extraButtonClassName}>
          <Button
            className={extraButtonClassName}
            onClick={() => {
              setDraftQuiz({
                ...draftQuiz,
                questions: [
                  ...draftQuiz.questions,
                  {
                    title: "New Question",
                    answers: [
                      {
                        text: "New Answer",
                        isCorrect: false,
                      },
                      {
                        text: "New Answer",
                        isCorrect: true,
                      },
                    ],
                  },
                ],
              })
            }}
          >
            <TbPlus />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
