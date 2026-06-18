import React from "react";
import { Code, Brain, Globe, Wand2, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

const SUGGESTIONS = [
  { icon: Code,   text: "Write a Python web scraper",        color: "text-blue-500" },
  { icon: Brain,  text: "Explain quantum computing simply",   color: "text-purple-500" },
  { icon: Globe,  text: "What's happening in tech today?",    color: "text-green-500" },
  { icon: Wand2,  text: "Write a creative short story",       color: "text-orange-500" },
];

export default function WelcomeScreen({ onPrompt }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center min-h-[calc(100vh-112px)]">
      <div className="float-anim mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30 mx-auto">
          <span className="text-white font-black text-2xl tracking-tighter">OX</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        <span className="logo-gradient">oclxn</span>
      </h1>
      <p className="text-muted-foreground text-sm mb-1">
        by <span className="font-semibold text-foreground">Syed Developers</span>
      </p>
      <p className="text-muted-foreground text-xs mb-8">
        Created by Syed Haider Hussein · Powered by real AI
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onPrompt(s.text)}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:bg-muted/60 hover:border-primary/30 transition-all text-left group shadow-sm hover:shadow-md"
          >
            <div className={cn("p-2 rounded-lg bg-muted group-hover:bg-background transition-colors", s.color)}>
              <s.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-foreground">{s.text}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
