import { atom } from "nanostores"

// Constants
export const INITIAL_COUNTER_VALUE = 3
export const COUNTDOWN_INTERVAL_MS = 1000
export const MIN_COUNTER_VALUE = -1

// Stores
export const counterStore = atom(INITIAL_COUNTER_VALUE)
