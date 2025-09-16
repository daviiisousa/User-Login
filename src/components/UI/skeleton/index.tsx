import React from "react";

export function Skeleton({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={"animate-pulse rounded-md bg-slate-700 " + className}
      {...props}
    >
      {children}
    </div>
  );
}
