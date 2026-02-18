import { EditQuestionActions } from "@/quiz/components/molecules/edit-question-actions"
import { EditQuizQuestionAnswersForm } from "@/quiz/components/molecules/edit-quiz-answers-form"
import { EditQuizQuestionMultimediaForm } from "@/quiz/components/molecules/edit-quiz-question-multimedia-form"
import { CurrentQuizTitleForm } from "@/quiz/components/molecules/new-quiz-title-form"

// Component
export function CurrentQuizContent() {
  return (
    <section className="no-scrollbar mb-28 flex flex-1 flex-col gap-4 overflow-y-scroll">
      <EditQuestionActions />

      <CurrentQuizTitleForm />

      <EditQuizQuestionMultimediaForm />

      <EditQuizQuestionAnswersForm />
    </section>
  )
}
