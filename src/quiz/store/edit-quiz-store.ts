import { Quiz } from "@/quiz/model/quiz-model"
import { atom, onSet } from "nanostores"

// Stores
export const editQuizStore = atom<Quiz | null>(null)
export const initialEditQuizStore = atom<Quiz | null>(null)

// Sync initialEditQuizStore with editQuizStore
onSet(editQuizStore, ({ newValue }) => {
  // This means that the edit quiz is being reset to null, so we should also reset the initial edit quiz
  if (newValue === null) {
    initialEditQuizStore.set(null)
    return
  }

  // If the initial edit quiz is null, set it to the new value
  const initialEditQuiz = initialEditQuizStore.get()

  // This ensures that we capture the initial state of the quiz when it is first set
  if (initialEditQuiz === null) initialEditQuizStore.set(newValue)
})

// Reset
export function resetEditedQuiz() {
  editQuizStore.set(initialEditQuizStore.get())
}
