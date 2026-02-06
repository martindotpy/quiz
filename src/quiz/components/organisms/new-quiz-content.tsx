import { EditQuestionActions } from "@/quiz/components/molecules/edit-question-actions"
import { EditQuizQuestionAnswersForm } from "@/quiz/components/molecules/edit-quiz-answers-form"
import { EditQuizQuestionMultimediaForm } from "@/quiz/components/molecules/edit-quiz-question-multimedia-form"
import { NewQuizTitleForm } from "@/quiz/components/molecules/new-quiz-title-form"

// Component
export function NewQuizContent() {
  return (
    <section className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-scroll">
      <div className="flex flex-col gap-2">
        <EditQuestionActions />

        <NewQuizTitleForm />
      </div>

      <EditQuizQuestionMultimediaForm />

      <EditQuizQuestionAnswersForm />
    </section>
  )
}
