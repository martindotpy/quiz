import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog"
import { Input } from "@/core/components/ui/input"
import { cn } from "@/core/lib/tailwind"
import { useCurrentQuestion } from "@/quiz/hook/use-current-question"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { useIdbSrc } from "@/quiz/hook/use-idb-src"
import { deleteFromIdb, isIdbSrc, saveToIdb } from "@/quiz/lib/multimedia-idb"
import type { QuizMultimedia } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState } from "react"
import { TbMusic, TbPhoto, TbPhotoPlus, TbTrash, TbVideo } from "react-icons/tb"

// i18n
const editQuizQuestionMultimediaMessages = i18nInstance(
  "quiz:edit:question:multimedia",
  {
    label: "Click to add multimedia",
    title: "Multimedia",
    save: "Save",
    remove: "Remove",
    url: "URL",
    file: "File",
    urlPlaceholder: "https://...",
    chooseFile: "Choose file",
    image: "Image",
    video: "Video",
    audio: "Audio",
  }
)

// Constants
const ACCEPT_BY_TYPE = {
  image: "image/*",
  video: "video/*",
  audio: "audio/*",
} as const

type MediaType = "image" | "video" | "audio"
type SourceType = "url" | "file"

const TYPE_ICONS = {
  image: TbPhoto,
  video: TbVideo,
  audio: TbMusic,
} as const

// Shared media renderer (used in trigger preview + dialog preview)
interface MediaDisplayProps {
  multimedia: QuizMultimedia
  className?: string
}

function MediaDisplay({ multimedia, className }: MediaDisplayProps) {
  const [error, setError] = useState(false)
  // Resolves "idb://" keys to object URLs; returns the src unchanged for plain URLs
  const resolvedSrc = useIdbSrc(multimedia.src)

  if (resolvedSrc === null) {
    // Still loading from IDB
    return (
      <div
        className={cn(
          "bg-muted/10 flex animate-pulse items-center justify-center",
          className
        )}
      />
    )
  }

  if (error || resolvedSrc === undefined) {
    return (
      <div
        className={cn(
          "bg-muted/30 flex items-center justify-center",
          className
        )}
      >
        <span className="text-muted-foreground/50 text-[10px] tracking-wider uppercase">
          Failed to load
        </span>
      </div>
    )
  }

  if (multimedia.type === "image") {
    return (
      <img
        src={resolvedSrc}
        alt=""
        className={cn("h-full w-full object-cover", className)}
        onError={() => setError(true)}
      />
    )
  }

  if (multimedia.type === "video") {
    return (
      <video
        src={resolvedSrc}
        className={cn("h-full w-full object-contain", className)}
        controls
        preload="metadata"
        onError={() => setError(true)}
      />
    )
  }

  return (
    <div
      className={cn(
        "bg-muted/10 flex flex-col items-center justify-center gap-3 p-6",
        className
      )}
    >
      <TbMusic className="text-muted-foreground size-8" />
      <audio
        src={resolvedSrc}
        controls
        className="w-full max-w-50"
        onError={() => setError(true)}
      />
    </div>
  )
}

// Component
export function EditQuizQuestionMultimediaForm() {
  const t = useStore(editQuizQuestionMultimediaMessages)
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()
  const { question, questionIndex } = useCurrentQuestion()
  const currentMultimedia = question.multimedia

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dialog + form state
  const [open, setOpen] = useState(false)
  const [mediaType, setMediaType] = useState<MediaType>("image")
  const [sourceType, setSourceType] = useState<SourceType>("url")
  const [urlValue, setUrlValue] = useState("")
  // For file mode: holds a temporary blob: URL used only for in-dialog preview.
  // The actual File is kept in pendingFileRef; it is written to IDB on Save.
  const [fileBlobUrl, setFileBlobUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const pendingFileRef = useRef<File | null>(null)
  const previewBlobUrlRef = useRef<string | null>(null)

  const activeSrc = (sourceType === "url" ? previewSrc : fileBlobUrl) ?? null
  const canSave =
    sourceType === "url" ? urlValue.trim().length > 0 : fileBlobUrl !== null

  const revokePendingBlob = () => {
    if (previewBlobUrlRef.current) {
      URL.revokeObjectURL(previewBlobUrlRef.current)
      previewBlobUrlRef.current = null
    }
  }

  const handleOpenChange = (value: boolean) => {
    if (value) {
      if (currentMultimedia) {
        setMediaType(currentMultimedia.type)
        const isIdb = isIdbSrc(currentMultimedia.src)
        setSourceType(isIdb ? "file" : "url")
        setUrlValue(isIdb ? "" : currentMultimedia.src)
        // For existing IDB entries the preview is rendered via MediaDisplay/useIdbSrc
        setFileBlobUrl(isIdb ? currentMultimedia.src : null)
        setFileName(null)
        setPreviewSrc(currentMultimedia.src)
      } else {
        setMediaType("image")
        setSourceType("url")
        setUrlValue("")
        setFileBlobUrl(null)
        setFileName(null)
        setPreviewSrc(null)
      }
    } else {
      // Revoke the temporary preview blob URL when closing
      revokePendingBlob()
      pendingFileRef.current = null
    }
    setOpen(value)
  }

  const updateQuestion = (multimedia: QuizMultimedia | undefined) => {
    const questions = [...currentQuiz.questions]
    const q = questions[questionIndex]
    if (!q) return
    if (multimedia) {
      questions[questionIndex] = { ...q, multimedia }
    } else {
      const next = { ...q }
      delete next.multimedia
      questions[questionIndex] = next
    }
    setCurrentQuiz({ ...currentQuiz, questions })
  }

  const handleSave = async () => {
    if (sourceType === "url") {
      const src = urlValue.trim()
      if (!src) return
      // If the previous src was an IDB entry, clean it up
      if (currentMultimedia && isIdbSrc(currentMultimedia.src)) {
        await deleteFromIdb(currentMultimedia.src)
      }
      updateQuestion({ type: mediaType, src })
    } else {
      if (!pendingFileRef.current) return
      // Write the File to IDB as a Blob and persist the key
      const idbSrc = await saveToIdb(pendingFileRef.current)
      // If there was a previous IDB entry for this question, delete it
      if (currentMultimedia && isIdbSrc(currentMultimedia.src)) {
        await deleteFromIdb(currentMultimedia.src)
      }
      updateQuestion({ type: mediaType, src: idbSrc })
    }
    revokePendingBlob()
    pendingFileRef.current = null
    setOpen(false)
  }

  const handleRemove = async () => {
    if (currentMultimedia && isIdbSrc(currentMultimedia.src)) {
      await deleteFromIdb(currentMultimedia.src)
    }
    updateQuestion(undefined)
    setOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Keep the actual File for IDB write on Save — do NOT read it to DataURL
    pendingFileRef.current = file
    setFileName(file.name)
    // Create a temporary blob: URL only for the in-dialog preview
    revokePendingBlob()
    const blobUrl = URL.createObjectURL(file)
    previewBlobUrlRef.current = blobUrl
    setFileBlobUrl(blobUrl)
    setPreviewSrc(blobUrl)
  }

  const ActiveIcon = TYPE_ICONS[mediaType]

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className={cn(
          "group relative min-h-[45dvh] w-full overflow-hidden border transition-colors duration-200",
          "focus-visible:ring-ring/50 focus-visible:ring-1 focus-visible:outline-none",
          currentMultimedia
            ? "border-border bg-muted/5"
            : "bg-card text-muted-foreground hover:border-foreground/20"
        )}
      >
        {currentMultimedia ? (
          <div className="absolute inset-0">
            <MediaDisplay
              multimedia={currentMultimedia}
              className="absolute inset-0"
            />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
            <TbPhotoPlus className="size-14 transition-transform duration-300 group-hover:scale-105" />
            <p className="text-center text-sm">{t.label}</p>
          </div>
        )}

        {/* hover overlay */}
        <motion.div
          initial={false}
          whileHover={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center",
            currentMultimedia ? "bg-black/40" : "bg-foreground/[0.03]"
          )}
        >
          <span
            className={cn(
              "border px-3 py-1.5 text-[11px] font-medium tracking-[0.1em] uppercase",
              currentMultimedia
                ? "border-white/30 text-white"
                : "border-foreground/25 text-foreground"
            )}
          >
            {currentMultimedia ? "Edit" : "Add media"}
          </span>
        </motion.div>
      </button>

      {/* ── Dialog ──────────────────────────────────────────── */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="gap-0 p-0 sm:max-w-xl">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle>{t.title}</DialogTitle>
          </DialogHeader>

          <div className="grid sm:grid-cols-[1fr_240px]">
            {/* Preview pane */}
            <div className="bg-muted/10 relative min-h-52 border-b sm:border-r sm:border-b-0">
              <AnimatePresence mode="wait">
                {activeSrc ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0"
                  >
                    <MediaDisplay
                      multimedia={{ type: mediaType, src: activeSrc }}
                      className="absolute inset-0"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  >
                    <ActiveIcon className="text-muted-foreground/20 size-10" />
                    <span className="text-muted-foreground/30 text-[9px] tracking-[0.2em] uppercase">
                      Preview
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls pane */}
            <div className="flex flex-col gap-4 p-4">
              {/* Type selector */}
              <div className="flex gap-1">
                {(["image", "video", "audio"] as const).map((type) => {
                  const Icon = TYPE_ICONS[type]
                  const label =
                    type === "image"
                      ? t.image
                      : type === "video"
                        ? t.video
                        : t.audio
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setMediaType(type)
                        // reset file input when changing type
                        setFileBlobUrl(null)
                        setFileName(null)
                        pendingFileRef.current = null
                        revokePendingBlob()
                        setPreviewSrc(
                          sourceType === "url" ? urlValue.trim() || null : null
                        )
                      }}
                      className={cn(
                        "flex flex-1 flex-col items-center gap-1.5 border py-2 text-[9px] font-medium tracking-[0.12em] uppercase transition-all duration-150",
                        mediaType === type
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      <Icon className="size-3" />
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Source type tabs */}
              <div className="flex border-b">
                {(["url", "file"] as const).map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setSourceType(src)
                      setPreviewSrc(
                        src === "url" ? urlValue.trim() || null : fileBlobUrl
                      )
                    }}
                    className={cn(
                      "flex-1 pb-2 text-[10px] font-medium tracking-wide transition-all duration-150",
                      sourceType === src
                        ? "border-foreground text-foreground -mb-px border-b-2"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {src === "url" ? t.url : t.file}
                  </button>
                ))}
              </div>

              {/* Input area */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {sourceType === "url" ? (
                    <motion.div
                      key="url"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Input
                        type="url"
                        placeholder={t.urlPlaceholder}
                        value={urlValue}
                        onChange={(e) =>
                          setUrlValue((e.target as HTMLInputElement).value)
                        }
                        onBlur={() => setPreviewSrc(urlValue.trim() || null)}
                        className="w-full"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="file"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.1 }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={ACCEPT_BY_TYPE[mediaType]}
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground w-full border border-dashed py-5 text-[10px] tracking-wider uppercase transition-all duration-150",
                          fileName && "border-foreground/30 text-foreground"
                        )}
                      >
                        <span className="block max-w-full overflow-hidden px-2 text-ellipsis whitespace-nowrap">
                          {fileName ?? t.chooseFile}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="border-t px-4 py-3 sm:justify-between">
            {currentMultimedia ? (
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={handleRemove}
              >
                <TbTrash />
                {t.remove}
              </Button>
            ) : (
              <span />
            )}
            <Button
              size="sm"
              type="button"
              onClick={handleSave}
              disabled={!canSave}
            >
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
