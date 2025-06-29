import { Controller, useFormContext } from "react-hook-form";

import { cn } from "../../../lib/utils";
import type { AppInputProps } from "../../../types/form";
import { Label } from "../../ui/Label";
import { TextArea } from "../../ui/TextArea";

export default function AppTextArea({
  name,
  label,
  placeholder,
  endContent,
  classNames,
  isRequired = false,
  isDisabled = false,
}: AppInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div
          className={cn("flex flex-col gap-y-2", classNames?.grandContainer)}
        >
          <Label
            className={`${classNames?.label ?? ""}`}
            htmlFor={`label-${name}`}
          >
            {label}
          </Label>
          <div className={`relative ${classNames?.container ?? ""}`}>
            <TextArea
              id={`label-${name}`}
              className={`${classNames?.input ?? ""} ${
                error ? "border-destructive" : ""
              }`}
              placeholder={placeholder}
              disabled={isDisabled}
              required={isRequired}
              aria-invalid={error ? "true" : "false"}
              {...field}
            />
            {endContent && (
              <div
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  classNames?.endContent ?? ""
                }`}
              >
                {endContent}
              </div>
            )}
          </div>
          {error && error?.message && (
            <p className="text-red-500 text-xs" role="alert" aria-live="polite">
              {error?.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
