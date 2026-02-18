import type { QuestionAnswer, QuizQuestion } from "@/quiz/model/quiz-model"

export interface QuestionResponse {
  question: QuizQuestion
  selected: QuestionAnswer
}
