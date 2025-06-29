import * as React from "react";
import { cn } from "../../lib/utils";

function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input"
      className={cn(
        "border-gray-300 file:text-foreground placeholder:text-muted-foreground/70 text-sm lg:text-[14px] flex h-10 md:h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  placeholder:text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/20 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { TextArea };
