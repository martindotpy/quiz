import { Route } from "@/pages/_app/routes/{-$locale}/_main"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { like, or, useLiveQuery } from "@tanstack/react-db"

// Hook
export function useLiveQuiz() {
  // Q
  const { q } = Route.useSearch()
  const qLikeExpression = q ? `%${q}%` : `%`

  const { data: quizzes, ...restLiveQuery } = useLiveQuery(
    (q) =>
      q
        .from({ quizzes: quizCollection })
        .where(({ quizzes }) =>
          or(
            like(quizzes.name, qLikeExpression),
            like(quizzes.description, qLikeExpression)
          )
        ),
    [qLikeExpression]
  )

  return { quizzes, ...restLiveQuery }
}
