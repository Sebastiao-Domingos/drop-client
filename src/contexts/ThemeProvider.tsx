"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<{
  theme?: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({
  theme: "light",
  setTheme() {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">();

  useEffect(() => {
    if (!theme) {
      const value = localStorage.getItem("theme");
      setTheme(value === "light" ? "light" : "dark");
      return;
    }
    const html = document.getElementsByTagName("html")[0];
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
