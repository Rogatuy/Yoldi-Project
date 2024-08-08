"use client";

import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import { AuthProvider } from "@/context/AuthState";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen" suppressHydrationWarning={true}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
