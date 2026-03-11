"use client";
import { ThemeProvider } from "./context/ThemeProvider";

export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
