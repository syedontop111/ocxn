import React, { useState } from "react";
import { cn } from "@/utils/cn";

const TooltipProvider = ({ children }) => <>{children}</>;

const Tooltip = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { __tooltipOpen: open }) : child
      )}
    </div>
  );
};

const TooltipTrigger = React.forwardRef(({ children, asChild, __tooltipOpen, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ref, ...props });
  }
  return <span ref={ref} {...props}>{children}</span>;
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = ({ children, className, __tooltipOpen, sideOffset = 4, ...props }) => {
  if (!__tooltipOpen) return null;
  return (
    <div
      className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50 overflow-hidden rounded-md bg-foreground px-3 py-1.5 text-xs text-background whitespace-nowrap pointer-events-none",
        className
      )}
      style={{ marginBottom: sideOffset }}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
