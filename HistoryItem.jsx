import React from "react";
import { X, Globe, Code, Brain, Wand2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Separator } from "./ui/Separator";
import { cn } from "@/utils/cn";

const CAPABILITIES = [
  { icon: Globe,  label: "Web Search",  desc: "Real-time internet access",    color: "text-green-500" },
  { icon: Code,   label: "Code & Debug", desc: "All programming languages",   color: "text-blue-500" },
  { icon: Brain,  label: "Reasoning",   desc: "Complex analysis & math",      color: "text-purple-500" },
  { icon: Wand2,  label: "Creative",    desc: "Writing & storytelling",        color: "text-orange-500" },
];

export default function RightSidebar({ open, onClose }) {
  return (
    <aside
      className={cn(
        "flex flex-col border-l border-sidebar-border bg-sidebar shrink-0 transition-all duration-300 overflow-hidden",
        open ? "w-[260px]" : "w-0 opacity-0"
      )}
    >
      <div className="flex flex-col h-full min-w-[260px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-14">
          <span className="font-semibold text-sm text-sidebar-foreground">About oclxn</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4 text-sidebar-foreground/60" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Branding */}
          <div className="flex flex-col items-center text-center pt-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-3 shadow-xl shadow-violet-500/30">
              <span className="text-white font-black text-xl">OX</span>
            </div>
            <h2 className="text-base font-black logo-gradient">oclxn</h2>
            <p className="text-xs text-muted-foreground mt-1">by Syed Developers</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Created by Syed Haider Hussein
            </p>
          </div>

          <Separator />

          {/* Capabilities */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Capabilities
            </p>
            {CAPABILITIES.map((cap, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 border border-border"
              >
                <cap.icon className={cn("w-4 h-4 shrink-0", cap.color)} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground">{cap.label}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Status */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </p>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">API Connected</p>
                <p className="text-[10px] text-muted-foreground">Groq · LLaMA 3.3 70B</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20">
              <Globe className="w-4 h-4 text-green-500 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">100% Free</p>
                <p className="text-[10px] text-muted-foreground">No credit card needed</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-center">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              oclxn is an AI chat interface powered by Groq & LLaMA. Built with love by{" "}
              <span className="font-semibold text-foreground">Syed Haider Hussein</span> at{" "}
              <span className="font-semibold text-foreground">Syed Developers</span>.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
