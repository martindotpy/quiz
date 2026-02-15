import { InitialGameCounter } from "@/game/components/organisms/initial-game-counter"
import { useEffect, useState } from "react"

// Constants
const INITIAL_COUNTER = 3
const COUNTDOWN_INTERVAL = 1000
const MIN_COUNTER_VALUE = 0

// Component
export function QuizGame() {
  // Counter
  const [counter, setCounter] = useState(INITIAL_COUNTER)

  useEffect(() => {
    if (counter <= MIN_COUNTER_VALUE) return

    const timeout = setTimeout(() => {
      setCounter(counter - 1)
    }, COUNTDOWN_INTERVAL)

    return () => clearTimeout(timeout)
  }, [counter, setCounter])

  return (
    <>
      {counter > MIN_COUNTER_VALUE && <InitialGameCounter counter={counter} />}
    </>
  )
}
