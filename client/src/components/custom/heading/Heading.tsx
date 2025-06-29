import React from "react";

export default function Heading({
  variant = "h1",
  children,
}: {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}) {
  return (
    <div>
      {variant === "h1" && <h1 className="text-2xl font-bold">{children}</h1>}
      {variant === "h2" && <h2 className="text-xl font-bold">{children}</h2>}
      {variant === "h3" && <h3 className="text-lg font-bold">{children}</h3>}
      {variant === "h4" && <h4 className="text-base font-bold">{children}</h4>}
      {variant === "h5" && <h5 className="text-sm font-bold">{children}</h5>}
      {variant === "h6" && <h6 className="text-xs font-bold">{children}</h6>}
    </div>
  );
}
