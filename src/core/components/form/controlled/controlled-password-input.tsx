import {
  labelBaseClassName,
  labelTextBaseClassName,
  svgInputBaseClassName,
} from "@/core/components/form/styles/input-styles"
import { Input } from "@/core/components/ui/input"
import { cn } from "@/core/lib/tailwind"
import { useState } from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { LuEye, LuEyeOff } from "react-icons/lu"

// Component
interface ControlledPasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label: React.ReactNode
  inputProps?: React.HTMLAttributes<HTMLInputElement>
  labelProps?: React.HTMLAttributes<HTMLLabelElement>
  labelTextProps?: React.HTMLAttributes<HTMLSpanElement>
  errorLabelProps?: React.HTMLAttributes<HTMLSpanElement>
}

export function ControlledPasswordInput<
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
  ...props
}: ControlledPasswordInputProps<TFieldValues, TName>) {
  // Password visible
  const [showPassword, setPassword] = useState(false)

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
              <Input
                id={name}
                type={showPassword ? "text" : "password"}
                className={cn(inputClassName, "peer")}
                placeholder="••••••••"
                autoComplete="current-password"
                {...field}
                {...(error && { "aria-invalid": true })}
                {...inputProps}
              />

              <LuEye
                className={cn(
                  svgInputBaseClassName,
                  "z-10 peer-[[type=password]]:hidden hover:cursor-pointer"
                )}
                onClick={() => setPassword((prev) => !prev)}
              />
              <LuEyeOff
                className={cn(
                  svgInputBaseClassName,
                  "z-10 peer-[[type=text]]:hidden hover:cursor-pointer"
                )}
                onClick={() => setPassword((prev) => !prev)}
              />
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
