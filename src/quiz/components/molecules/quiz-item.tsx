import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/core/components/ui/item"
import type { Quiz } from "@/quiz/model/quiz-model"
import { Link } from "@tanstack/react-router"

// Component
interface QuizItemProps {
  quiz: Quiz
}

export function QuizItem({ quiz }: QuizItemProps) {
  return (
    <Link to="/{-$locale}/quiz/$quizId" params={{ quizId: quiz.id }}>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{quiz.name}</ItemTitle>
          <ItemDescription>{quiz.description}</ItemDescription>
        </ItemContent>
        <ItemFooter>{typeof quiz.createdAt}</ItemFooter>
      </Item>
    </Link>
  )
}
