import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import ConditionalHeader from "@/components/ConditionalHeader";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <ConditionalHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
