import { useEffect, useRef, useState } from "react"

// Component
interface TimeBarProps {
  maxTimeSeconds: number
  index: number
}

export function TimeBar({ maxTimeSeconds, index }: TimeBarProps) {
  const [progress, setProgress] = useState(100)

  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const remainingRef = useRef(maxTimeSeconds * 1000)

  useEffect(() => {
    remainingRef.current = maxTimeSeconds * 1000
    lastTimeRef.current = null

    const loop = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = now - lastTimeRef.current
        remainingRef.current -= delta
      }

      lastTimeRef.current = now

      const percentage = Math.max(
        0,
        (remainingRef.current / (maxTimeSeconds * 1000)) * 100
      )

      setProgress(percentage)

      if (remainingRef.current > 0) {
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [maxTimeSeconds, index])

  return (
    <div className="bg-muted fixed top-[calc(var(--spacing-header-h)+0rem)] left-0 h-2 w-full overflow-hidden">
      <div className="bg-primary h-full" style={{ width: `${progress}%` }} />
    </div>
  )
}
