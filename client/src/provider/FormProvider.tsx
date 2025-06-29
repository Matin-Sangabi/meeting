import { type FieldValues, FormProvider as Form } from "react-hook-form";
import type { FormProviderProps } from "../types/form";

export default function FormProvider<T extends FieldValues>({
  methods,
  onSubmit,
  children,
}: FormProviderProps<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className="w-full">
        {children}
      </form>
    </Form>
  );
}
