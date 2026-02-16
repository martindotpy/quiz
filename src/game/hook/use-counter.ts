import {
  COUNTDOWN_INTERVAL_MS,
  counterStore,
  MIN_COUNTER_VALUE,
} from "@/game/store/counter-store"
import { useStore } from "@nanostores/react"
import { useEffect } from "react"

// Hook
export function useCounter() {
  const counter = useStore(counterStore)

  useEffect(() => {
    if (counter < MIN_COUNTER_VALUE) return

    const timeout = setTimeout(() => {
      counterStore.set(counter - 1)
    }, COUNTDOWN_INTERVAL_MS)

    return () => clearTimeout(timeout)
  }, [counter])

  return counter
}
