import { aiChatNames, type AiChat } from "@/ai/constants/ai-chat"
import { useAiGenerationMode } from "@/ai/hook/use-ai-generation-mode"
import { Button } from "@/core/components/ui/button"
import {
  FieldDescription,
  FieldSet,
  FieldTitle,
} from "@/core/components/ui/field"
import { log } from "@/core/logger/client-logger"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { questionsJsonSchema } from "@/quiz/model/quiz-model"
import { useAiChat } from "@/settings/hook/use-ai-chat"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import * as TOON from "@toon-format/toon"
import { TbCopy, TbExternalLink } from "react-icons/tb"
import { toast } from "sonner"

// i18n
const generatedPromptMessages = i18nInstance("quiz:ai:generated-prompt", {
  title: "Generated prompt",
  promptTip:
    "Use the following prompt to generate questions with your favorite Ai. You can modify the prompt to get better results. Click the text below to ask your Ai directly, or copy the prompt using the copy button.",
  promptAdd: params(
    "Generate a strictly valid JSON according to this schema:\n{questionsSchema}\nUsing the following questions only as thematic and stylistic reference, generate a new set of high-quality questions that are fully different from the reference ones, related to {title}{description}. Maintain thematic coherence, conceptual depth, and cognitive difficulty, ensuring variety and avoiding repetition. Generate the same number of questions unless explicitly specified otherwise. The default time limit is {timeLimitSeconds} seconds. Return only the JSON inside a code block. Reference questions:\n{currentQuestions}"
  ),
  promptReplace: params(
    "Generate a strictly valid JSON according to this schema:\n{questionsSchema}\nUsing the following questions only as thematic and stylistic reference, generate a completely new set of high-quality questions to fully replace the existing ones. Do not reuse, paraphrase, or slightly modify the original questions. All questions must be fully different, related to {title}{description}, maintaining thematic coherence, conceptual depth, cognitive difficulty, and variety. Generate the same number of questions unless explicitly specified otherwise. The default time limit is {timeLimitSeconds} seconds. Return only the JSON inside a code block. Reference questions:\n{currentQuestions}"
  ),
  promptImprove: params(
    "Generate a strictly valid JSON according to this schema:\n{questionsSchema}\nUsing the following questions as a base, improve their quality by making them clearer, more precise, conceptually deeper, and cognitively more demanding, while preserving their original intent. You may restructure, merge, or split questions when beneficial, but must maintain thematic coherence and variety. All questions are related to {title}{description}. The default time limit is {timeLimitSeconds} seconds. Return only the JSON inside a code block. Reference questions:\n{currentQuestions}"
  ),
  withDescriptionPrompt: params(" with context {description}"),
  copy: "Copy prompt",
  copySuccess: "Prompt copied to clipboard!",
  openWith: params("Open with {aiChat}"),
})

// Ai chat template links
type AiChatUrlTemplate = Record<AiChat, string>

const aiChatUrlTemplate: AiChatUrlTemplate = {
  chatgpt: "https://chatgpt.com?prompt={prompt}",
  claude: "https://claude.ai/new?q={prompt}",
  mistral: "https://chat.mistral.ai/chat?q={prompt}",
  perplexity: "https://www.perplexity.ai/search?q={prompt}",
}

// Component
export function GeneratedPromptStep() {
  const messages = useStore(generatedPromptMessages)

  // Ai chat
  const aiChat = useAiChat()

  // Generation mode
  const generationMode = useAiGenerationMode()

  // Current quiz
  const { currentQuiz } = useCurrentQuiz()

  // Prompt
  const descriptionPrompt = currentQuiz.description
    ? messages.withDescriptionPrompt({ description: currentQuiz.description })
    : ""

  const isAddMode = generationMode === "add"
  const isReplaceMode = generationMode === "replace"

  const templatePrompt = isAddMode
    ? messages.promptAdd
    : isReplaceMode
      ? messages.promptReplace
      : messages.promptImprove

  const prompt = templatePrompt({
    questionsSchema: questionsJsonSchema,
    currentQuestions: TOON.encode(
      // Use only the last 6 questions as reference to avoid overwhelming the Ai and to encourage more diversity in the generated questions
      isAddMode ? currentQuiz.questions.slice(-6) : currentQuiz.questions
    ),
    title: currentQuiz.name,
    description: descriptionPrompt,
    timeLimitSeconds: currentQuiz.timeLimitSeconds,
  })
  const aiChatUrl = aiChatUrlTemplate[aiChat].replace(
    "{prompt}",
    encodeURIComponent(prompt)
  )

  // Copy
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt)

      toast.success(messages.copySuccess)
    } catch (err) {
      log.error("Failed to copy prompt to clipboard", { err })

      toast.error("Failed to copy prompt to clipboard")
    }
  }

  return (
    <FieldSet>
      <FieldTitle>{messages.title}</FieldTitle>
      <FieldDescription>{messages.promptTip}</FieldDescription>

      <div className="bg-card relative block max-h-[10dvh] overflow-hidden border px-2.5 py-2 text-xs">
        <pre className="m-0 overflow-auto font-mono text-xs break-all whitespace-pre-wrap">
          {prompt}
        </pre>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--color-background), color-mix(in oklab, var(--color-background) 30%, transparent), transparent)",
          }}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={copyToClipboard}>
          <TbCopy /> {messages.copy}
        </Button>
        <Button
          variant="secondary"
          nativeButton={false}
          render={
            <a href={aiChatUrl} target="_blank" rel="noopener noreferrer">
              <TbExternalLink />
              {messages.openWith({ aiChat: aiChatNames[aiChat] })}
            </a>
          }
        />
      </div>
    </FieldSet>
  )
}
