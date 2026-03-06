import { openDB, type DBSchema } from "idb"
import { v7 as uuidv7 } from "uuid"

// IDB prefix used in multimedia.src to identify local blobs
export const IDB_PREFIX = "idb://"

interface MultimediaSchema extends DBSchema {
  files: {
    key: string
    value: Blob
  }
}

const DB_NAME = "quiz-multimedia"
const DB_VERSION = 1

function getDb() {
  return openDB<MultimediaSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore("files")
    },
  })
}

/** Stores a Blob in IDB and returns an opaque key like "idb://uuid". */
export async function saveToIdb(blob: Blob): Promise<string> {
  const db = await getDb()
  const key = uuidv7()
  await db.put("files", blob, key)
  return `${IDB_PREFIX}${key}`
}

/** Retrieves a Blob from IDB given an "idb://uuid" src string. */
export async function getFromIdb(src: string): Promise<Blob | undefined> {
  const key = src.slice(IDB_PREFIX.length)
  const db = await getDb()
  return db.get("files", key)
}

/** Deletes a stored Blob from IDB given an "idb://uuid" src string. */
export async function deleteFromIdb(src: string): Promise<void> {
  const key = src.slice(IDB_PREFIX.length)
  const db = await getDb()
  await db.delete("files", key)
}

/** Returns true if the src is a local IDB reference. */
export function isIdbSrc(src: string): boolean {
  return src.startsWith(IDB_PREFIX)
}
