import { cn } from "@/core/lib/tailwind"
import { motion } from "motion/react"
import { TbPhoto } from "react-icons/tb"

export function QuestionMultimediaGame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="relative flex flex-1 items-center justify-center overflow-hidden border"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,currentColor_45%,currentColor_55%,transparent_55%)] bg-[length:8px_8px] opacity-[0.015]" />

      <div className="via-border/50 absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
      <div className="from-border/50 to-border/50 absolute top-0 right-0 h-full w-px bg-gradient-to-b via-transparent" />
      <div className="via-border/50 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
      <div className="from-border/50 to-border/50 absolute top-0 left-0 h-full w-px bg-gradient-to-b via-transparent" />

      <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative">
          <div className="bg-muted/50 absolute -inset-2 rounded-full" />
          <TbPhoto className="text-muted-foreground/30 relative size-8" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-muted-foreground/40 text-[10px] font-medium tracking-[0.15em] uppercase">
            Media placeholder
          </span>
          <div className="flex gap-1">
            <span
              className={cn("bg-muted-foreground/10 size-1 rounded-full")}
            />
            <span
              className={cn("bg-muted-foreground/15 size-1 rounded-full")}
            />
            <span
              className={cn("bg-muted-foreground/10 size-1 rounded-full")}
            />
          </div>
        </div>
      </div>

      <div className="absolute top-2 left-2">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground/20 text-[10px] tracking-wider uppercase">
            IMG
          </span>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <div className="flex items-center gap-1">
          <div className="bg-muted-foreground/10 size-1.5 rounded-full" />
          <div className="bg-muted-foreground/10 size-1.5 rounded-full" />
          <div className="bg-muted-foreground/10 size-1.5 rounded-full" />
        </div>
      </div>
    </motion.div>
  )
}
