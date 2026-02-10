import { EditQuestionActions } from "@/quiz/components/molecules/edit-question-actions"
import { EditQuizQuestionAnswersForm } from "@/quiz/components/molecules/edit-quiz-answers-form"
import { EditQuizQuestionMultimediaForm } from "@/quiz/components/molecules/edit-quiz-question-multimedia-form"
import { CurrentQuizTitleForm } from "@/quiz/components/molecules/new-quiz-title-form"
import { useEffect } from "react"

// Component
export function CurrentQuizContent() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-scroll">
      <div className="flex flex-col gap-2">
        <EditQuestionActions />

        <CurrentQuizTitleForm />
      </div>

      <EditQuizQuestionMultimediaForm />

      <EditQuizQuestionAnswersForm />
    </section>
  )
}
