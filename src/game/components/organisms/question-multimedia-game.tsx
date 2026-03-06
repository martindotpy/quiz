import { cn } from "@/core/lib/tailwind"
import { useIdbSrc } from "@/quiz/hook/use-idb-src"
import type { QuizMultimedia } from "@/quiz/model/quiz-model"
import { motion } from "motion/react"
import { useState } from "react"
import { TbAlertTriangle, TbMusic } from "react-icons/tb"

interface QuestionMultimediaGameProps {
  multimedia: QuizMultimedia
}

export function QuestionMultimediaGame({
  multimedia,
}: QuestionMultimediaGameProps) {
  const [error, setError] = useState(false)
  const resolvedSrc = useIdbSrc(multimedia.src)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="relative h-full overflow-hidden border"
    >
      {resolvedSrc === null ? (
        // Loading from IDB
        <div className="bg-muted/10 h-full w-full animate-pulse" />
      ) : error || resolvedSrc === undefined ? (
        <div className="bg-muted/20 flex h-full flex-col items-center justify-center gap-2">
          <TbAlertTriangle className="text-muted-foreground size-6" />
          <span className="text-muted-foreground/40 text-[10px] tracking-widest uppercase">
            Failed to load
          </span>
        </div>
      ) : multimedia.type === "image" ? (
        <img
          src={resolvedSrc}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : multimedia.type === "video" ? (
        <video
          src={resolvedSrc}
          className="h-full w-full object-contain"
          controls
          preload="metadata"
          onError={() => setError(true)}
        />
      ) : (
        <div
          className={cn(
            "bg-muted/10 flex h-full flex-col items-center justify-center gap-4 p-4"
          )}
        >
          <TbMusic className="text-muted-foreground size-7" />
          <audio
            src={resolvedSrc}
            controls
            className="w-full max-w-xs"
            onError={() => setError(true)}
          />
        </div>
      )}
    </motion.div>
  )
}
