import { ControlledFileInput } from "@/core/components/form/controlled/controlled-file-input"
import { ControlledNumberInput } from "@/core/components/form/controlled/controlled-number-input"
import { ControlledTextInput } from "@/core/components/form/controlled/controlled-text-input"
import { log } from "@/core/logger/client-logger"
import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form"
import type { ZodObject } from "zod/v4"
import type { $ZodShape, $ZodTypeDef } from "zod/v4/core"

// Unsupported type error
export class UnsupportedInputTypeError extends Error {
  constructor(type: string) {
    super(`Unsupported input type: ${type}`)
    this.name = "UnsupportedInputTypeError"
  }
}

// Default values for types
const defaultValues: Partial<Record<$ZodTypeDef["type"], unknown>> = {
  string: "",
  number: 0,
}

// Input factory
interface ControlledInputFactoryOptions<
  Shape extends $ZodShape = $ZodShape,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Pick<ControllerProps<TFieldValues, TName>, "control"> {
  schema: ZodObject<Shape>
  disabled?: {
    [key in keyof Shape]?: boolean
  }
  labels?: {
    [key in keyof Shape]?: string
  }
}

/**
 * Factory to create controlled inputs based on a Zod schema.
 * @param options - Options containing the schema, control, and optional labels.
 * @returns An array of React elements representing the inputs.
 */
export function controlledInputFactory<
  Shape extends $ZodShape = $ZodShape,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  schema,
  control,
  labels,
  disabled = {},
}: ControlledInputFactoryOptions<
  Shape,
  TFieldValues,
  TName
>): React.ReactElement[] {
  // Extract the shape of the validator
  const shape = schema.shape

  // Create inputs based on the shape
  const inputs: React.ReactElement[] = []

  for (const [key, value] of Object.entries(shape)) {
    let zodType = value._zod.def.type
    let zodDefinition = value._zod.def
    const label = labels?.[key] ?? key
    const defaultValue = defaultValues[zodType]
    const isDisabled = disabled[key] ?? false

    while (
      (zodType === "optional" || zodType === "nonoptional") &&
      "innerType" in zodDefinition &&
      zodDefinition.innerType &&
      typeof zodDefinition.innerType === "object" &&
      "def" in zodDefinition.innerType
    ) {
      zodDefinition = zodDefinition.innerType.def as $ZodTypeDef
      zodType = zodDefinition.type
    }

    switch (zodType) {
      case "string":
        inputs.push(
          <ControlledTextInput
            key={key}
            control={control}
            name={key as Path<TFieldValues>}
            label={label}
            defaultValue={
              defaultValue as PathValue<TFieldValues, Path<TFieldValues>>
            }
            inputProps={{
              readOnly: isDisabled,
              tabIndex: isDisabled ? -1 : 0,
            }}
          />
        )
        break
      case "number": {
        let maxValue: number | undefined
        let minValue: number | undefined

        for (const check of zodDefinition.checks ?? []) {
          if ("value" in check._zod.def)
            switch (check._zod.def.check) {
              case "less_than":
                maxValue = check._zod.def.value as number
                break

              case "greater_than":
                minValue = check._zod.def.value as number
                break
            }
        }
        inputs.push(
          <ControlledNumberInput
            key={key}
            control={control}
            name={key as Path<TFieldValues>}
            label={label}
            inputProps={{
              readOnly: isDisabled,
              tabIndex: isDisabled ? -1 : 0,
              max: maxValue,
              min: minValue,
            }}
            defaultValue={
              defaultValue as PathValue<TFieldValues, Path<TFieldValues>>
            }
          />
        )
        break
      }
      case "file":
        inputs.push(
          <ControlledFileInput
            key={key}
            control={control}
            name={key as Path<TFieldValues>}
            label={label}
            inputProps={{
              readOnly: isDisabled,
              tabIndex: isDisabled ? -1 : 0,
            }}
          />
        )
        break
      default: {
        log.info({ zodDefinition: zodDefinition.checks })

        throw new UnsupportedInputTypeError(zodType)
      }
    }
  }

  return inputs
}
