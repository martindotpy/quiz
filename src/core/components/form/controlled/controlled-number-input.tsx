import {
  labelBaseClassName,
  svgInputBaseClassName,
} from "@/core/components/form/styles/input-styles"
import { Field, FieldError, FieldLabel } from "@/core/components/ui/field"
import {
  NumberInput,
  type NumberInputProps,
} from "@/core/components/ui/number-input"
import type { ClassNameProp } from "@/core/kit/component-kit"
import { cn } from "@/core/lib/tailwind"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// Component
interface ControlledNumberInputProps<
  TIconProps extends ClassNameProp = ClassNameProp,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label: React.ReactNode
  inputProps?: NumberInputProps
  labelProps?: React.HTMLAttributes<HTMLLabelElement>
  errorProps?: React.HTMLAttributes<HTMLSpanElement>
  icon?: React.FunctionComponent<TIconProps>
  iconProps?: TIconProps
}

export function ControlledNumberInput<
  TIconProps extends ClassNameProp = ClassNameProp,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  inputProps: { className: inputClassName, ...inputProps } = {},
  labelProps: { className: labelClassName, ...labelProps } = {},
  errorProps: { className: errorClassName, ...errorProps } = {},
  icon: Icon,
  iconProps = {} as TIconProps,
  ...props
}: ControlledNumberInputProps<TIconProps, TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor={name}
            className={cn(labelBaseClassName, labelClassName)}
            {...labelProps}
          >
            {label}

            <div className="relative">
              <NumberInput
                id={name}
                className={inputClassName}
                aria-invalid={fieldState.invalid}
                {...field}
                onChange={undefined}
                onValueChange={(value) => field.onChange(value)}
                {...inputProps}
              />

              {Icon && (
                <Icon
                  {...iconProps}
                  className={cn(
                    svgInputBaseClassName,
                    "peer",
                    iconProps.className
                  )}
                />
              )}
            </div>

            {fieldState.invalid && (
              <FieldError
                className={cn(errorClassName)}
                {...errorProps}
                errors={[fieldState.error]}
              />
            )}
          </FieldLabel>
        </Field>
      )}
      {...props}
    />
  )
}
