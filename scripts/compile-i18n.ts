import { nonDefaultLocales } from "@/core/configuration/i18n-configuration"
import { Glob } from "bun"
import { createConsola } from "consola"
import ts from "typescript"

// Logger
const log = createConsola({
  defaults: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    badge: false,
  },
})

// Types
type TranslationEntry = {
  componentName: string
  translationKeys: string[]
}

type TranslationBody = Record<string, Record<string, string | object>>

// Function to extract component name and translation keys
function getComponentNameAndKeyTranslation(
  node: ts.Node
): TranslationEntry | undefined {
  // Check if node is a call expression to i18nInstance or useI18n
  const isTranslationExpression =
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    (node.expression.text === "i18nInstance" ||
      node.expression.text === "useI18n")

  // If not, continue traversing
  if (!isTranslationExpression) {
    return ts.forEachChild(node, getComponentNameAndKeyTranslation)
  }

  // Extract arguments
  const [firstArg, secondArg] = node.arguments

  if (!firstArg || !secondArg) {
    log.warn("Translation function called with insufficient arguments")

    return
  }

  // Check first argument (component name)
  if (!ts.isStringLiteral(firstArg)) {
    return
  }

  const componentName = firstArg.text

  // Check second argument (key-value object)
  if (!ts.isObjectLiteralExpression(secondArg)) {
    log.warn(
      "Could not extract translation keys for component %s",
      componentName
    )

    return
  }

  const translationKeys: string[] = []

  secondArg.properties.forEach((prop) => {
    const hasArg = ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)

    if (!hasArg) return

    if (ts.isStringLiteral(prop.initializer)) {
      translationKeys.push(prop.name.text)
    }

    // Get the string literals from the params function
    if (
      ts.isCallExpression(prop.initializer) &&
      ts.isIdentifier(prop.initializer.expression) &&
      prop.initializer.expression.text === "params"
    ) {
      const firstParamsArg = prop.initializer.arguments[0]!

      if (ts.isStringLiteral(firstParamsArg)) {
        translationKeys.push(prop.name.text)
      }
    }
  })

  return { componentName, translationKeys }
}

// Rescursive object key
function getSortedObjectByKeys(obj: object): object {
  const sortedKeys = Object.keys(obj).sort()
  const sortedObj: Record<string, unknown> = {}

  for (const key of sortedKeys) {
    const value = (obj as Record<string, unknown>)[key]
    if (value && typeof value === "object" && !Array.isArray(value)) {
      sortedObj[key] = getSortedObjectByKeys(value)
    } else {
      sortedObj[key] = value
    }
  }

  return sortedObj
}

// Typescript code
const typescriptSourceGlob = new Glob("src/**/*.{ts,tsx}")

// Translation from code
const translationEntryFromCode: Record<string, string[]> = {}

// Process all files
for await (const path of typescriptSourceGlob.scan()) {
  const content = await Bun.file(path).text()

  // Extract the key
  const sourceFile = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.ESNext,
    true,
    path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )

  // Get the component name and translation keys
  const result = getComponentNameAndKeyTranslation(sourceFile)

  if (!result) continue

  // Check for duplicates
  if (result.componentName in translationEntryFromCode) {
    log.error(
      "Duplicate component name found: %s in file %s",
      result.componentName,
      path
    )

    process.exit(1)
  }

  // Add to the translation entry
  translationEntryFromCode[result.componentName] = result.translationKeys
}

process.exitCode = 0

const translationKeysFromCode = Object.keys(translationEntryFromCode)

log.success(
  "Extracted translation entries from code: %d",
  translationKeysFromCode.length
)

// Get the translations and verify
await Promise.all(
  nonDefaultLocales.map(async (locale) => {
    // Get the translation from locale JSON
    const translationPath = `src/translation/json/${locale}.json`
    const translationFile = Bun.file(translationPath)
    const translation = (await translationFile.json()) as TranslationBody

    // Custom logger
    const _log = log.withTag(translationPath)

    // Sorted
    const sortedTranslationKeys = Object.keys(translation).sort()
    const sortedTranslation: Record<string, unknown> = {}

    // Check the missing keys
    const missingKeys = translationKeysFromCode
      .filter((entry) => !sortedTranslationKeys.includes(entry))
      .map((entry) => entry)

    if (missingKeys.length > 0) {
      _log.error(
        "Locale %s is missing translations for components:\n%s",
        locale,
        missingKeys.map((entry) => "  - " + entry).join("\n")
      )

      process.exitCode = 1
    } else {
      _log.success("All components have translations in locale: %s", locale)
    }

    // Sort the keys and check for extras
    const extraKeys = sortedTranslationKeys
      .filter((entry) => {
        // Get the body
        const translationBody = translation[entry]!

        // Sort the body
        sortedTranslation[entry] = getSortedObjectByKeys(translationBody)

        // Check for extra
        const isExtra = !translationKeysFromCode.includes(entry)

        if (isExtra) return isExtra

        // If not extra, verify if all keys are present
        const codeKeys = translationEntryFromCode[entry]!
        const translationBodyKeys = Object.keys(translationBody)

        const missingInnerKeys = codeKeys.filter(
          (key) => !translationBodyKeys.includes(key)
        )

        if (missingInnerKeys.length > 0) {
          _log.error(
            "Locale %s is missing translation keys for component \n  %s\n%s",
            locale,
            entry,
            missingInnerKeys.map((key) => "  - " + key).join("\n")
          )

          process.exitCode = 1
        }

        return isExtra
      })
      .map((entry) => entry)

    if (extraKeys.length > 0) {
      _log.error(
        "Locale %s has extra translations for components not in code:\n%s",
        locale,
        extraKeys.map((entry) => "  - " + entry).join("\n")
      )

      process.exitCode = 1
    } else {
      _log.success("No extra translations in locale: %s", locale)
    }

    // Save the sorted translation back to file
    await Bun.write(
      translationFile,
      JSON.stringify(sortedTranslation, null, 2) + "\n"
    )

    _log.success("Sorted translation file for locale: %s", locale)
  })
)
