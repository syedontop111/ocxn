import React from "react";
import { AlertCircle } from "lucide-react";
import AIResponse from "./AIResponse";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { cn } from "@/utils/cn";

export default function ChatMessage({ message, isLast, isStreaming, onRegenerate }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "group flex gap-3 w-full animate-slide-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-sm mt-0.5 shrink-0">
          <span className="text-white font-black text-[10px]">OX</span>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[88%] sm:max-w-[82%] lg:max-w-2xl",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Hover label */}
        <div className="flex items-center gap-2 mb-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium text-foreground">
            {isUser ? "You" : "oclxn"}
          </span>
          <span className="text-[10px] text-muted-foreground">{message.timestamp}</span>
        </div>

        {/* Bubble */}
        <div
          className={cn(
            "relative px-4 py-3 shadow-sm text-sm",
            isUser
              ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm"
              : "bg-card border border-border rounded-2xl rounded-tl-sm w-full"
          )}
        >
          {message.role === "error" ? (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message.content}</span>
            </div>
          ) : isUser ? (
            <p className="whitespace-pre-wrap text-[13px] sm:text-sm leading-relaxed">
              {message.content}
            </p>
          ) : (
            <AIResponse
              content={message.content}
              isStreaming={isLast && isStreaming}
              onRegenerate={onRegenerate}
            />
          )}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <Avatar className="h-8 w-8 border border-border mt-0.5 shrink-0">
          <AvatarFallback className="bg-muted text-foreground text-xs font-bold">
            ME
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
