import { useState, useCallback, useRef } from "react";
import { streamGroqResponse } from "@/utils/api";
import { storage } from "@/utils/storage";

export function useChat() {
  const [messages, setMessages]     = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortCtrlRef = useRef(null);

  const sendMessage = useCallback(
    async (text, apiKey) => {
      if (!text.trim() || isThinking || isStreaming) return;

      const userMsg = {
        id: Date.now(),
        role: "user",
        content: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsThinking(true);

      const ctrl = new AbortController();
      abortCtrlRef.current = ctrl;

      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        content: "",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      // Show thinking dots briefly then switch to streaming bubble
      setTimeout(() => {
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
        setIsStreaming(true);
      }, 300);

      try {
        await streamGroqResponse(
          updatedMessages,
          apiKey || storage.getApiKey(),
          (chunk) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === aiMsg.id ? { ...m, content: chunk } : m))
            );
          },
          ctrl.signal
        );
      } catch (err) {
        if (err.name === "AbortError") {
          // User stopped — keep whatever streamed
        } else {
          setMessages((prev) => [
            ...prev.filter((m) => m.content !== "" || m.role === "user"),
            {
              id: Date.now() + 2,
              role: "error",
              content: err.message || "Something went wrong. Please check your API key.",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }
      } finally {
        setIsThinking(false);
        setIsStreaming(false);
        abortCtrlRef.current = null;
      }

      // Return userMsg so App can auto-title the chat
      return userMsg;
    },
    [messages, isThinking, isStreaming]
  );

  const stopStreaming = useCallback(() => {
    abortCtrlRef.current?.abort();
    setIsThinking(false);
    setIsStreaming(false);
  }, []);

  const regenerate = useCallback(
    (apiKey) => {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      if (!lastUser) return;
      const idx = messages.findIndex((m) => m.id === lastUser.id);
      setMessages((prev) => prev.slice(0, idx + 1));
      setTimeout(() => sendMessage(lastUser.content, apiKey), 100);
    },
    [messages, sendMessage]
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return {
    messages,
    isThinking,
    isStreaming,
    sendMessage,
    stopStreaming,
    regenerate,
    clearMessages,
  };
}
