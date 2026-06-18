import React from "react";
import { MoreHorizontal, Pin, PinOff, Edit3, Archive, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/DropdownMenu";
import { cn } from "@/utils/cn";

export default function HistoryItem({
  label,
  active,
  isPinned,
  onPin,
  onUnpin,
  onDelete,
  onClick,
}) {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left text-sm rounded-md px-3 py-2 pr-8 truncate transition-all",
          active
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        {label}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {isPinned ? (
            <DropdownMenuItem onClick={onUnpin}>
              <PinOff className="w-4 h-4 mr-2" /> Unpin
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={onPin}>
              <Pin className="w-4 h-4 mr-2" /> Pin
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Edit3 className="w-4 h-4 mr-2" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive className="w-4 h-4 mr-2" /> Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
