import { useCounter } from "@/game/hook/use-counter"
import { MIN_COUNTER_VALUE } from "@/game/store/counter-store"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { AnimatePresence, motion } from "motion/react"

// i18n
const quizGameCounterMessages = i18nInstance("quiz:game:counter", {
  go: "Go!",
})

// Component
export function GameCounter() {
  const messages = useStore(quizGameCounterMessages)

  // Counter
  const counter = useCounter()

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center select-none"
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={counter}
          initial={{ y: 32, opacity: 0, scale: 0.94, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ y: -32, opacity: 0, scale: 1.06, filter: "blur(6px)" }}
          transition={{
            y: { type: "spring", stiffness: 440, damping: 30, mass: 0.55 },
            opacity: { duration: 0.16 },
            scale: { duration: 0.2 },
            filter: { duration: 0.2 },
          }}
          className="text-8xl leading-none font-black tabular-nums"
        >
          {counter === MIN_COUNTER_VALUE + 1 ? messages.go : counter}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}
