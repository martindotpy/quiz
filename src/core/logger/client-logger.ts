import { createConsola } from "consola/browser"

// Logger
export const log = createConsola({
  level: 20,
  formatOptions: {
    date: true,
  },
})
