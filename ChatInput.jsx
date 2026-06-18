import React from "react";
import { cn } from "@/utils/cn";

export default function SidebarItem({ icon: Icon, label, shortcut, active, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 text-sm group",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={cn(
            "w-4 h-4",
            active
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {count && (
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full font-semibold border",
              active
                ? "bg-background border-primary/20 text-primary"
                : "bg-muted border-transparent text-muted-foreground"
            )}
          >
            {count}
          </span>
        )}
        {shortcut && (
          <span className="hidden group-hover:block text-[10px] bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground">
            {shortcut}
          </span>
        )}
      </div>
    </button>
  );
}
