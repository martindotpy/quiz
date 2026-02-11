import { Link } from "@/core/components/ui/link"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { useMode } from "@/quiz/hook/use-mode"
import { TbWriting } from "react-icons/tb"

// Component
export function ManualEditCurrentQuizLink() {
  // Mode
  const { isCreationMode } = useMode()

  // Link to
  const to: LinkRoute = isCreationMode
    ? "/{-$locale}/quiz/new/$questionId"
    : "/{-$locale}/quiz/$quizId/edit/$questionId"

  return (
    <Link to={to} variant="default" size="icon">
      <TbWriting />
    </Link>
  )
}
