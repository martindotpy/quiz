import { Quiz } from "@/quiz/model/quiz-model"
import { deepEqual } from "fast-equals"
import { atom, computed, onSet } from "nanostores"

// Stores
export const editQuizStore = atom<Quiz | null>(null)
export const initialEditQuizStore = atom<Quiz | null>(null)
export const hasUnsavedChangesStore = computed(
  [editQuizStore, initialEditQuizStore],
  (editQuiz, initialEditQuiz) => !deepEqual(editQuiz, initialEditQuiz)
)

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
