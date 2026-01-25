/**
 * Get element from dom by selector string.
 * @example
 * 	const elementClass = $('.my-class')
 * 	const elementId = $('#my-id')
 * @param selector - CSS selector string
 * @param context - Document or HTMLElement to scope the search
 * @returns HTMLElement
 */
export const $ = <T extends HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document
) => {
  const element = context.querySelector<T>(selector)

  return element
}

/**
 * Get elements from dom by selector string.
 * @example
 * 	const elements = $$('.my-class')
 * @param selector - CSS selector string
 * @param context - Document or HTMLElement to scope the search
 * @returns NodeList
 */
export const $$ = <T extends HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document
) => {
  const elements = context.querySelectorAll<T>(selector)

  return elements
}
