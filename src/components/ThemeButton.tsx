"use client";

import { ThemeContext } from "@/contexts/ThemeProvider";
import { useContext } from "react";

function ThemeButton({ className }: { className?: string }) {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={className}
    >
      {theme === "light" && (
        <span className="material-symbols-outlined text-slate-900 text-2xl">
          mode_night
        </span>
      )}
      {theme === "dark" && (
        <span className="material-symbols-outlined text-2xl">light_mode</span>
      )}
      {!theme && <span className="material-symbols-outlined">routine</span>}
    </button>
  );
}

export default ThemeButton;
