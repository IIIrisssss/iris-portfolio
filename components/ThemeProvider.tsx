"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeCtx = {
  accent: string;
  setAccent: (c: string) => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

const DEFAULT_ACCENT = "#cbcbcb";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  const setAccent = useCallback((c: string) => {
    setAccentState(c);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-secondary", accent);
  }, [accent]);

  return <Ctx.Provider value={{ accent, setAccent }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
