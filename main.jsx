import React from "react";
import { Send, StopCircle } from "lucide-react";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
export default function ChatInput({
  value,
  onChange,
  onSend,
  onStop,
  isThinking,
  isStreaming,
  disabled,
  textareaRef,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const busy = isThinking || isStreaming;

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm px-4 py-3">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask oclxn anything…"
            rows={1}
            className="flex-1 border-0 bg-transparent px-4 py-3.5 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[52px] max-h-[200px] overflow-y-auto shadow-none"
            style={{ fieldSizing: "content" }}
            disabled={disabled}
          />
          <div className="flex items-center gap-1 pr-2 pb-2">
            {busy ? (
              <Button
                size="icon"
                onClick={onStop}
                className="h-9 w-9 rounded-xl bg-red-500 hover:bg-red-600 text-white border-0 shrink-0"
              >
                <StopCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="icon"
                onClick={onSend}
                disabled={!value.trim() || disabled}
                className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          oclxn ·{" "}
          <span className="font-medium">Syed Developers</span> · Created by Syed Haider Hussein ·
          Press Enter to send
        </p>
      </div>
    </div>
  );
}
