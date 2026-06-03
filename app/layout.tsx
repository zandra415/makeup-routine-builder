import type { Metadata } from "next";
import { Syne, Josefin_Sans } from "next/font/google";
import "./globals.css";
import LumiChat from '@/components/LumiChat'

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "ZanZan",
  description: "Your personalized makeup routine builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${josefinSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}<LumiChat /></body>
    </html>
  );
}
