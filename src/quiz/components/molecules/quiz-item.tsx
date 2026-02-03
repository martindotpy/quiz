import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/core/components/ui/item"
import type { Quiz } from "@/quiz/model/quiz-model"
import { formatterInstance, i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import { Link } from "@tanstack/react-router"

// i18n
const quizItemMessages = i18nInstance("quiz:item", {
  modified: params("Modified {time}"),
  created: params("Created on {time}"),
})

// Now
const nowTime = Date.now()

// Component
interface QuizItemProps {
  quiz: Quiz
}

export function QuizItem({ quiz }: QuizItemProps) {
  const messages = useStore(quizItemMessages)

  // Formatter
  const formatter = useStore(formatterInstance)

  // Date difference in days
  const daysDiff = Math.round(
    (nowTime - quiz.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Link to="/{-$locale}/quiz/$quizId" params={{ quizId: quiz.id }}>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{quiz.name}</ItemTitle>
          <ItemDescription>{quiz.description}</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span>
            {messages.modified({
              time: formatter.relativeTime(-daysDiff, "days", {
                style: "long",
                numeric: "auto",
              }),
            })}
          </span>
          <span>
            {messages.created({ time: formatter.time(quiz.createdAt) })}
          </span>
        </ItemFooter>
      </Item>
    </Link>
  )
}
