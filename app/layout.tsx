import "./globals.css";

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
// import { Providers } from "./providers";
import { CrispProvider } from "@/components/crisp-provider";
// import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genius",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Providers>
    // using className and colorScheme to remove class,style extra attributes hydration mismatch warning between nextui client side and nextjs13 server side
    // NOTE: Or we can also use ---> supressHydrationWarning
    //  className="light" style={{ colorScheme: "light" }}
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* <Providers> */}
        <CrispProvider />
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
        {/* </Providers> */}
      </html>
    </ClerkProvider>
  );
}
