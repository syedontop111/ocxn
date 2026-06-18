import React from "react";
import { Plus, Search, MessageSquare, Bookmark, Settings, PanelLeft, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import HistoryItem from "./HistoryItem";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@/utils/cn";

export default function LeftSidebar({
  open,
  onClose,
  isMobile,
  activeTab,
  setActiveTab,
  chats,
  setChats,
  activeChat,
  onNewChat,
  onSelectChat,
  searchQuery,
  setSearchQuery,
}) {
  const { theme, setTheme } = useTheme();

  const pinnedChats = chats.filter(
    (c) => c.pinned && c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const recentChats = chats.filter(
    (c) => !c.pinned && c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "flex flex-col border-r border-sidebar-border bg-sidebar shrink-0 transition-all duration-300 overflow-hidden z-50",
          isMobile
            ? cn("fixed inset-y-0 left-0 w-[280px] max-w-[85vw]", open ? "translate-x-0" : "-translate-x-full")
            : cn("relative", open ? "w-[280px]" : "w-0 opacity-0")
        )}
      >
        <div className="flex flex-col h-full min-w-[280px] p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pl-1">
            <div className="flex items-center gap-2.5">
              <Logo />
              <div>
                <span className="text-base font-black tracking-tight text-sidebar-foreground logo-gradient">
                  oclxn
                </span>
                <p className="text-[9px] text-muted-foreground leading-none mt-0.5">
                  by Syed Developers
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <PanelLeft className="w-4 h-4 text-sidebar-foreground/60" />
            </Button>
          </div>

          {/* New Chat */}
          <Button
            className="w-full justify-start gap-2 h-10 shadow-md mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 glow-btn"
            onClick={onNewChat}
          >
            <Plus className="w-4 h-4" /> New Chat
          </Button>

          {/* Search */}
          <div className="relative mb-5 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 h-9 bg-sidebar-accent/50 border-sidebar-border focus:bg-background transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Nav */}
          <div className="space-y-0.5 mb-5">
            <SidebarItem icon={MessageSquare} label="Chats" shortcut="⌘1" active={activeTab === "chats"} count={chats.length} onClick={() => setActiveTab("chats")} />
            <SidebarItem icon={Bookmark}      label="Saved" shortcut="⌘2" active={activeTab === "saved"}    onClick={() => setActiveTab("saved")} />
            <SidebarItem icon={Settings}      label="Settings" shortcut="⌘," active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-4">
            {pinnedChats.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">
                  Pinned
                </p>
                <div className="space-y-0.5">
                  {pinnedChats.map((c) => (
                    <HistoryItem
                      key={c.id}
                      label={c.label}
                      active={c.id === activeChat}
                      isPinned
                      onUnpin={() =>
                        setChats((p) => p.map((x) => x.id === c.id ? { ...x, pinned: false } : x))
                      }
                      onDelete={() => setChats((p) => p.filter((x) => x.id !== c.id))}
                      onClick={() => onSelectChat(c.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {recentChats.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">
                  Recent
                </p>
                <div className="space-y-0.5">
                  {recentChats.map((c) => (
                    <HistoryItem
                      key={c.id}
                      label={c.label}
                      active={c.id === activeChat}
                      onPin={() =>
                        setChats((p) => p.map((x) => x.id === c.id ? { ...x, pinned: true } : x))
                      }
                      onDelete={() => setChats((p) => p.filter((x) => x.id !== c.id))}
                      onClick={() => onSelectChat(c.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-sidebar-border mt-3">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-white text-[9px] font-black">SH</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">
                  Syed Haider Hussein
                </p>
                <p className="text-[10px] text-muted-foreground">Syed Developers</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
