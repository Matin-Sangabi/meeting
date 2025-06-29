import { FormEvent, ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormProviderProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export interface AppInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  endContent?: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  classNames?: {
    input?: string;
    label?: string;
    error?: string;
    container?: string;
    endContent?: string;
    grandContainer?: string;
    base?: string;
  };
  rows?: number;
}
