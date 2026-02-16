import { aiGenerationModeStore } from "@/ai/store/ai-generation-mode-store"
import { BaseError } from "@/core/lib/error"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import type { QuizQuestion } from "@/quiz/model/quiz-model"
import { useStore } from "@nanostores/react"

// Types
type UpdateQuestionsByAiGenerationMode = (questions: QuizQuestion[]) => void

// Error
class UnsupportedGenerationModeError extends BaseError {
  constructor(mode: string) {
    super(`Unsupported Ai generation mode: ${mode}`)
  }
}

// Hooks
export function useAiGenerationMode() {
  const aiGenerationMode = useStore(aiGenerationModeStore)

  return aiGenerationMode
}

function useAddGeneratedQuestions(): UpdateQuestionsByAiGenerationMode {
  // Current quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  return (questions: QuizQuestion[]) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: [...currentQuiz.questions, ...questions],
    })
  }
}

function useReplaceGeneratedQuestions(): UpdateQuestionsByAiGenerationMode {
  // Current quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  return (questions: QuizQuestion[]) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions,
    })
  }
}

/**
 * The "improve" mode is currently the same as "replace". Only changes the prompt, not the logic. In the future, it could be different.
 */
function useImproveGeneratedQuestions(): UpdateQuestionsByAiGenerationMode {
  // Replace
  const replaceGeneratedQuestions = useReplaceGeneratedQuestions()

  return replaceGeneratedQuestions
}

export function useUpdateQuestionsByAiGenerationMode(): UpdateQuestionsByAiGenerationMode {
  // Generation mode
  const aiGenerationMode = useAiGenerationMode()

  // Add
  const addGeneratedQuestions = useAddGeneratedQuestions()

  // Replace
  const replaceGeneratedQuestions = useReplaceGeneratedQuestions()

  // Improve
  const improveGeneratedQuestions = useImproveGeneratedQuestions()

  // Modes
  if (aiGenerationMode === "add") return addGeneratedQuestions
  if (aiGenerationMode === "replace") return replaceGeneratedQuestions
  if (aiGenerationMode === "improve") return improveGeneratedQuestions

  throw new UnsupportedGenerationModeError(aiGenerationMode)
}
