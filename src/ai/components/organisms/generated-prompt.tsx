import { Button } from "@/core/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/components/ui/tooltip"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { questionsJsonSchema } from "@/quiz/model/quiz-model"
import type { AiChat } from "@/settings/components/molecules/ai-chat-select"
import { useAiChat } from "@/settings/hook/use-ai-chat"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import * as TOON from "@toon-format/toon"
import { TbCopy } from "react-icons/tb"

// i18n
const generatedPromptMessages = i18nInstance("quiz:ai:generated-prompt", {
  title: "Generated Prompt",
  promptTip:
    "Use the following prompt to generate questions with your favorite AI. You can modify the prompt to get better results. Click the text below to ask your AI directly, or copy the prompt using the copy button.",
  prompt: params(
    "Generate a strictly valid JSON according to this schema:\n{questionsSchema}\nUsing the following questions as a reference, improve their quality, clarity and difficulty, and add new relevant questions about {title}{description}, maintaining thematic coherence and variety. Return only the JSON inside a code block. Reference questions:\n{currentQuestions}"
  ),
  withDescriptionPrompt: params(" with context {description}"),
  copy: "Copy prompt",
})

// Ai chat template links
type AiChatUrlTemplate = {
  [key in AiChat]: string
}

const aiChatUrlTemplate: AiChatUrlTemplate = {
  chatgpt: "https://chatgpt.com?prompt={prompt}",
  claude: "https://claude.ai/new?q={prompt}",
  mistral: "https://chat.mistral.ai/chat?q={prompt}",
  perplexity: "https://www.perplexity.ai/search?q={prompt}",
}

// Component
export function GeneratedPrompt() {
  const messages = useStore(generatedPromptMessages)

  // Ai chat
  const aiChat = useAiChat()

  // Current quiz
  const { currentQuiz } = useCurrentQuiz()

  // Prompt
  const descriptionPrompt = currentQuiz.description
    ? messages.withDescriptionPrompt({ description: currentQuiz.description })
    : ""
  const prompt = messages.prompt({
    questionsSchema: questionsJsonSchema,
    currentQuestions: TOON.encode(currentQuiz.questions),
    title: currentQuiz.name,
    description: descriptionPrompt,
  })
  const aiChatUrl = aiChatUrlTemplate[aiChat].replace(
    "{prompt}",
    encodeURIComponent(prompt)
  )

  // Copy
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">{messages.promptTip}</p>

      <div className="relative">
        <div
          style={{
            background:
              "linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)",
          }}
        >
          <a
            href={aiChatUrl}
            className="bg-card relative block max-h-[30dvh] overflow-hidden border px-2.5 py-2 pr-11 text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="overflow-hidden break-all"
              dangerouslySetInnerHTML={{
                __html: prompt.replaceAll("\n", "<br />"),
              }}
            />
          </a>
        </div>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="absolute top-2 right-2"
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                <TbCopy />
              </Button>
            }
          />

          <TooltipContent side="bottom">{messages.copy}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
