import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";

const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { __open: open, __setOpen: setOpen }) : child
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, asChild, __open, __setOpen, ...props }) => {
  const handleClick = (e) => { e.stopPropagation(); __setOpen?.(p => !p); };
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick, ...props });
  }
  return <button onClick={handleClick} {...props}>{children}</button>;
};

const DropdownMenuContent = ({ children, className, align = "start", __open, __setOpen, sideOffset = 4, ...props }) => {
  if (!__open) return null;
  const alignClass = align === "end" ? "right-0" : "left-0";
  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "top-full mt-1", alignClass, className
      )}
      {...props}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { __setOpen }) : child
      )}
    </div>
  );
};

const DropdownMenuItem = ({ children, className, onClick, __setOpen, ...props }) => (
  <button
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    onClick={(e) => { onClick?.(e); __setOpen?.(false); }}
    {...props}
  >
    {children}
  </button>
);

const DropdownMenuSeparator = ({ className, ...props }) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
);

const DropdownMenuLabel = ({ className, ...props }) => (
  <div className={cn("px-2 py-1.5 text-xs font-semibold", className)} {...props} />
);

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
};
