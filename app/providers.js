"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Wraps the app with next-themes for dark/light mode support
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
    >
      {children}
    </NextThemesProvider>
  );
}
