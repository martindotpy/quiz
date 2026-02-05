import { normalize } from "@/core/utils/string-utils"
import { Route as QuizQueryRoute } from "@/pages/_app/routes/{-$locale}/_main/route"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { ilike, or, useLiveQuery } from "@tanstack/react-db"

// Hook
export function useLiveQuiz() {
  // Query
  const { q } = QuizQueryRoute.useSearch()
  const qLikeExpression = q ? `%${normalize(q)}%` : `%`

  // Live query
  const { data: quizzes, ...restLiveQuery } = useLiveQuery(
    (q) =>
      q
        .from({ quizzes: quizCollection })
        .where(({ quizzes }) =>
          // TODO: Implement normalization at column value
          or(
            ilike(quizzes.name, qLikeExpression),
            ilike(quizzes.description, qLikeExpression)
          )
        )
        .orderBy(({ quizzes }) => quizzes.updatedAt, "desc"),
    [qLikeExpression]
  )

  return { quizzes, ...restLiveQuery }
}
