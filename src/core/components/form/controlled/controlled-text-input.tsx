import {
  inputWithIconBaseClassName,
  labelBaseClassName,
  svgInputBaseClassName,
} from "@/core/components/form/styles/input-styles"
import { Field, FieldError, FieldLabel } from "@/core/components/ui/field"
import { Input } from "@/core/components/ui/input"
import { cn } from "@/core/lib/tailwind"
import type { ClassValue } from "clsx"
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form"

// Component
interface ControlledTextInputProps<
  TIconProps extends { className?: ClassValue } = { className?: ClassValue },
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends UseControllerProps<TFieldValues, TName, TTransformedValues> {
  label?: React.ReactNode
  inputProps?: React.ComponentProps<typeof Input>
  labelProps?: React.ComponentProps<typeof FieldLabel>
  errorProps?: React.ComponentProps<typeof FieldError>
  icon?: React.FunctionComponent<TIconProps>
  iconProps?: TIconProps
}

export function ControlledTextInput<
  TIconProps extends { className?: ClassValue } = { className?: ClassValue },
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
}: ControlledTextInputProps<TIconProps, TFieldValues, TName>) {
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
              <Input
                id={name}
                type="text"
                className={cn(
                  { [inputWithIconBaseClassName]: Boolean(Icon) },
                  inputClassName
                )}
                aria-invalid={fieldState.invalid}
                {...field}
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
