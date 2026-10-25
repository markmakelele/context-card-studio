import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Context Card Studio", description: "Create, style, and preview accessible context cards." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
