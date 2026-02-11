import { Link } from "@/core/components/ui/link"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { useMode } from "@/quiz/hook/use-mode"
import { TbSparkles } from "react-icons/tb"

// Component
export function AiEditCurrentQuizLink() {
  // Mode
  const { isCreationMode } = useMode()

  // Link to
  const to: LinkRoute = isCreationMode
    ? "/{-$locale}/quiz/new/ai"
    : "/{-$locale}/quiz/$quizId/edit/ai"

  return (
    <Link to={to} variant="default" size="icon">
      <TbSparkles />
    </Link>
  )
}
