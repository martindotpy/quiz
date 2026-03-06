import type { AiGenerationMode } from "@/ai/store/ai-generation-mode-store"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import type { IconType } from "react-icons/lib"
import { TbArrowUp, TbPlus, TbReplace } from "react-icons/tb"

// i18n
const generationModeStepItemsMessages = i18nInstance(
  "quiz:ai:generator:mode-step:items",
  {
    addTitle: "Plus",
    addDescription: "Add new questions to the existing quiz.",
    improveTitle: "Improve",
    improveDescription: "Improve the existing questions in the quiz.",
    replaceTitle: "Replace",
    replaceDescription: "Replace the existing questions in the quiz.",
  }
)

// Items
type GenerationModeStepItems = Record<
  AiGenerationMode,
  {
    title: string
    description: string
    icon: IconType
  }
>

export function useGenerationModeStepItems(): GenerationModeStepItems {
  const messages = useStore(generationModeStepItemsMessages)

  return {
    add: {
      title: messages.addTitle,
      description: messages.addDescription,
      icon: TbPlus,
    },
    improve: {
      title: messages.improveTitle,
      description: messages.improveDescription,
      icon: TbArrowUp,
    },
    replace: {
      title: messages.replaceTitle,
      description: messages.replaceDescription,
      icon: TbReplace,
    },
  }
}
