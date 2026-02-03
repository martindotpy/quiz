import {
  labelBaseClassName,
  labelTextBaseClassName,
  svgInputBaseClassName,
} from "@/core/components/form/styles/input-styles"
import {
  NumberInput,
  type NumberInputProps,
} from "@/core/components/ui/number-input"
import { cn } from "@/core/lib/tailwind"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// Component
interface ControlledNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label: React.ReactNode
  inputProps?: NumberInputProps
  labelProps?: React.HTMLAttributes<HTMLLabelElement>
  labelTextProps?: React.HTMLAttributes<HTMLSpanElement>
  errorLabelProps?: React.HTMLAttributes<HTMLSpanElement>
  icon?: React.FunctionComponent<{ className?: string }>
}

export function ControlledNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  inputProps: { className: inputClassName, ...inputProps } = {},
  labelProps: { className: labelClassName, ...labelProps } = {},
  labelTextProps: { className: labelTextClassname, ...labelTextProps } = {},
  errorLabelProps: { className: errorLabelClassName, ...errorLabelProps } = {},
  icon: Icon,
  ...props
}: ControlledNumberInputProps<TFieldValues, TName>) {
  return (
    <label
      htmlFor={name}
      className={cn(labelBaseClassName, labelClassName)}
      {...labelProps}
    >
      <span
        className={cn(labelTextBaseClassName, labelTextClassname)}
        {...labelTextProps}
      >
        {label}
      </span>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative">
              <NumberInput
                id={name}
                className={inputClassName}
                {...field}
                onChange={undefined}
                onValueChange={(value) => field.onChange(value)}
                {...(error && { "aria-invalid": true })}
                {...inputProps}
              />

              {Icon && <Icon className={cn(svgInputBaseClassName, "peer")} />}
            </div>

            {error && (
              <span
                className={cn("text-xs text-red-400", errorLabelClassName)}
                {...errorLabelProps}
              >
                {error.message}
              </span>
            )}
          </>
        )}
        {...props}
      />
    </label>
  )
}
