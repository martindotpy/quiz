import { Button } from "@/core/components/ui/button"
import { cn } from "@/core/lib/tailwind"
import { forwardRef, useCallback, useEffect, useState } from "react"
import { LuChevronDown, LuChevronUp } from "react-icons/lu"
import { NumericFormat, type NumericFormatProps } from "react-number-format"

export interface NumberInputProps extends Omit<
  NumericFormatProps,
  "value" | "onValueChange"
> {
  stepper?: number
  thousandSeparator?: string
  placeholder?: string
  defaultValue?: number
  min?: number
  max?: number
  value?: number
  suffix?: string
  prefix?: string
  onValueChange?: (value: number | undefined) => void
  fixedDecimalScale?: boolean
  decimalScale?: number
}

export const NumberInput = forwardRef<
  HTMLInputElement,
  NumberInputProps
>(
  (
    {
      stepper,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      className,
      readOnly,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState<number | undefined>(
      controlledValue ?? defaultValue
    )

    const handleIncrement = useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? (stepper ?? 1)
          : Math.min(prev + (stepper ?? 1), max)
      )
    }, [stepper, max])

    const handleDecrement = useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? -(stepper ?? 1)
          : Math.max(prev - (stepper ?? 1), min)
      )
    }, [stepper, min])

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          document.activeElement ===
          (ref as React.RefObject<HTMLInputElement>)?.current
        ) {
          if (e.key === "ArrowUp") {
            handleIncrement()
          } else if (e.key === "ArrowDown") {
            handleDecrement()
          }
        }
      }

      window.addEventListener("keydown", handleKeyDown)

      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [handleIncrement, handleDecrement, ref])

    useEffect(() => {
      if (controlledValue !== undefined) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(controlledValue)
      }
    }, [controlledValue])

    // Handle number input change
    const handleChange = (values: {
      value: string
      floatValue: number | undefined
    }) => {
      const newValue =
        values.floatValue === undefined ? undefined : values.floatValue
      setValue(newValue)
      if (onValueChange) {
        onValueChange(newValue)
      }
    }

    const handleBlur = () => {
      if (value !== undefined) {
        if (value < min) {
          setValue(min)
          if ((ref as React.RefObject<HTMLInputElement>)?.current)
            (ref as React.RefObject<HTMLInputElement>).current!.value =
              String(min)
        } else if (value > max) {
          setValue(max)
          if ((ref as React.RefObject<HTMLInputElement>)?.current)
            (ref as React.RefObject<HTMLInputElement>).current!.value =
              String(max)
        }
      }
    }

    return (
      <div className="flex h-9 items-center">
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          placeholder={placeholder}
          className={cn(
            "relative h-full [appearance:textfield] rounded-none! [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className
          )}
          getInputRef={ref}
          readOnly={readOnly}
          {...props}
        />

        <div className="flex h-full flex-col">
          <Button
            aria-label="Increase value"
            className="border-input flex-1/2 rounded-l-none rounded-br-none border-b-[0.5px] border-l-0 px-2 py-0 focus-visible:relative"
            variant="outline"
            onClick={handleIncrement}
            disabled={value === max || readOnly}
          >
            <LuChevronUp className="size-3" />
          </Button>
          <Button
            aria-label="Decrease value"
            className="border-input flex-1/2 rounded-l-none rounded-tr-none border-t-[0.5px] border-l-0 px-2 py-0 focus-visible:relative"
            variant="outline"
            onClick={handleDecrement}
            disabled={value === min || readOnly}
          >
            <LuChevronDown className="size-3" />
          </Button>
        </div>
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"
