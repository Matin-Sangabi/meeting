import * as React from "react";
import { cn, createCva } from "../../lib/utils";
import { Link } from "react-router-dom";

const buttonVariants = createCva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-gray-200 hover:bg-gray-300 text-gray-700 ",
        primary: "bg-blue-500 text-white shadow-xs hover:bg-blue-600",
        destructive: "bg-red-500 text-white shadow-xs hover:bg-red-600",
        outline:
          "border border-blue-500 bg-background shadow-xs hover:bg-blue-500/20 hover:text-accent-foreground text-blue-500",
        secondary: "bg-orange-500 text-white shadow-xs hover:bg-orange-600",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-3 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  as,
  href,
  isLoading = false,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  as?: "button" | "Link";
  href?: string;
  isLoading?: boolean;
  variant?:
    | "default"
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  let Comp: React.ElementType = "button";

  if (asChild) {
    Comp = "button";
  } else if (as === "Link" && href) {
    Comp = Link;
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...(Comp === Link ? { to: href } : {})}
      {...props}
    >
      {isLoading ? <>loading ...</> : children}
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
