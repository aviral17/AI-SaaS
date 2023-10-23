"use client";

import { useEffect, useState } from "react";
import HydrationComponent from "../components/hydration";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark"]}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
