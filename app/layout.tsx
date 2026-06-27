import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUUZ | Smart. Secure. Rewarding.",
  description:
    "CRUUZ is a technology-powered mobility platform connecting riders, drivers, and businesses through safe, reliable, and intelligent transportation services.",
  keywords: [
    "CRUUZ",
    "Nexaro",
    "ride hailing",
    "mobility platform",
    "transportation",
    "Ghana transport",
    "driver app",
    "rider app",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#101936] text-white antialiased">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}