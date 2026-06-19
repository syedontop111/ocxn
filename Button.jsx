import React from "react";

export function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
