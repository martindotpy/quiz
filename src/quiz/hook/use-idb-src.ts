import { getFromIdb, isIdbSrc } from "@/quiz/lib/multimedia-idb"
import { useEffect, useRef, useState } from "react"

/**
 * Resolves a multimedia `src` to a renderable URL.
 *
 * - If `src` starts with "idb://", retrieves the Blob from IndexedDB and
 *   creates a short-lived object URL (revoked automatically on cleanup).
 * - Otherwise returns `src` unchanged.
 *
 * Returns `null` while loading from IDB, or `undefined` if the blob is missing.
 */
export function useIdbSrc(src: string): string | null | undefined {
  const isIdb = isIdbSrc(src)
  // Non-IDB src: skip the async path entirely
  const [resolvedSrc, setResolvedSrc] = useState<string | null | undefined>(
    isIdb ? null : src
  )
  const objectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    // Plain URL: keep in sync without async work
    if (!isIdb) {
      // Defer the state update to avoid calling setState during the sync
      // phase of the effect (React Compiler strictness)
      const id = setTimeout(() => setResolvedSrc(src), 0)
      return () => clearTimeout(id)
    }

    let cancelled = false

    getFromIdb(src).then((blob) => {
      if (cancelled) return

      // Revoke previous object URL to avoid leaks
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }

      if (!blob) {
        setResolvedSrc(undefined)
        return
      }

      const url = URL.createObjectURL(blob)
      objectUrlRef.current = url
      setResolvedSrc(url)
    })

    return () => {
      cancelled = true
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [src, isIdb])

  return resolvedSrc
}
