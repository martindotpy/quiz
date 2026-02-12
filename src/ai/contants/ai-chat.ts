// Types
export type AiChat = "chatgpt" | "claude" | "mistral" | "perplexity"

// Names
export const aiChatNames: Record<AiChat, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  mistral: "Mistral",
  perplexity: "Perplexity",
}
