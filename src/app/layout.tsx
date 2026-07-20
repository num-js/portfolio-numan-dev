import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "@/components/footer/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md Numan Ahmed — Creative Developer",
  description: "Full-Stack Engineer & Creative Developer crafting cinematic, high-performance web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-void text-mist antialiased selection:bg-accent-orange selection:text-ink [font-family:var(--font-geist-sans)]">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
