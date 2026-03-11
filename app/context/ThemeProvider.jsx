"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const applyTheme = (newTheme) => {
  if (typeof document !== "undefined") {
    if (newTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check localStorage for saved theme on mount
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
