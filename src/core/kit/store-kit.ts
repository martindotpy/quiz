import {
  type PersistentSimpleOptions,
  persistentAtom,
} from "@nanostores/persistent"
import type { WritableAtom } from "nanostores"

export function persistentJSON<T>(
  name: string,
  initial: T,
  opts?: PersistentSimpleOptions
): WritableAtom<T>
export function persistentJSON<T>(
  name: string,
  initial?: undefined,
  opts?: PersistentSimpleOptions
): WritableAtom<T | undefined>
export function persistentJSON<T>(
  name: string,
  initial?: T,
  opts?: PersistentSimpleOptions
) {
  return persistentAtom<T>(name, initial as T, {
    encode: JSON.stringify,
    decode: JSON.parse,
    ...opts,
  })
}
