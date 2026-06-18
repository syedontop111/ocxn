import React from "react";

export default function ThinkingIndicator() {
  return (
    <div className="flex gap-3 w-full animate-slide-in">
      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-sm mt-0.5 shrink-0">
        <span className="text-white font-black text-[10px]">OX</span>
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5">
        <div className="thinking-dot w-2 h-2 rounded-full bg-primary" />
        <div className="thinking-dot w-2 h-2 rounded-full bg-primary" />
        <div className="thinking-dot w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
  );
}
