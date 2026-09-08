"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Bell, Sun, Moon, LogOut, UserCog, CircleUserRound } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 border-b border-border bg-surface/90 backdrop-blur px-4 md:px-6">
      <div className="relative flex-1 max-w-md">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="text"
          placeholder="Search modules..."
          className="w-full rounded-md border border-border bg-canvas pl-9 pr-3 py-2 text-[13px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft"
        />
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="relative h-9 w-9 flex items-center justify-center rounded-md text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <button
          aria-label="Notifications"
          className="relative h-9 w-9 flex items-center justify-center rounded-md text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 rounded-full bg-accent-soft flex items-center justify-center text-accent-strong hover:opacity-90 transition-opacity"
          >
            <CircleUserRound size={19} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute right-0 mt-2 w-52 rounded-lg border border-border bg-surface shadow-lg shadow-black/5 z-20 overflow-hidden"
                >
                  <div className="px-3.5 py-3 border-b border-border">
                    <p className="text-[13px] font-medium text-ink">Admin</p>
                    <p className="text-[12px] text-ink-faint">RealBiz Pro Ltd</p>
                  </div>
                  <nav className="py-1">
                    {[
                      { icon: CircleUserRound, label: "My Profile" },
                      { icon: UserCog, label: "User Management" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
                      >
                        <item.icon size={15} />
                        {item.label}
                      </button>
                    ))}
                    <button className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-danger hover:bg-danger-soft transition-colors">
                      <LogOut size={15} />
                      Log Out
                    </button>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
