import React from "react";

export function Textarea({
  className = "",
  ...props
}) {
  return (
    <textarea
      className={`w-full bg-transparent outline-none resize-none ${className}`}
      {...props}
    />
  );
}
