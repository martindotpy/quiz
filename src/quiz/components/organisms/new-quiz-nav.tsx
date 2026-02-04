import { cn } from "@/core/lib/tailwind"
import { Route } from "@/pages/_app/routes/{-$locale}/_main/quiz.new.manual.$questionId"
import { useQuizDraft } from "@/quiz/hook/use-quiz-draft"
import { TbQuestionMark } from "react-icons/tb"

// Component
export function NewQuizNav() {
  const { quizDraft } = useQuizDraft()
  const { questionIndex } = Route.useRouteContext()

  return (
    <nav>
      <ul
        className={cn(
          "flex overflow-x-scroll select-none",
          "md:overflow-x-hidden"
        )}
      >
        {quizDraft.questions.map((question, i) => (
          <li
            key={i}
            className={cn(
              "bg-card relative m-2 h-20 w-32",
              i === questionIndex && "outline-4 outline-offset-2"
            )}
          >
            <div className="m-2 line-clamp-1 flex-1 text-center text-xs break-all">
              {question.title}
            </div>

            <div className="absolute bottom-0 left-0 flex items-center gap-0.5 bg-[radial-gradient(100%_120%_at_0%_120%,rgba(0,0,0,0.08)_55%,rgba(0,0,0,0))] px-1 text-sm dark:bg-[radial-gradient(100%_120%_at_0%_120%,rgba(32,32,32,0.8)_55%,rgba(0,0,0,0))]">
              <TbQuestionMark />

              {i + 1}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}
