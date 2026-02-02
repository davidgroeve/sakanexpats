import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import HouseConstruction from "@/components/HouseConstruction";
import BlueprintConnector from "@/components/BlueprintConnector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SakanExpats - Premium Real Estate for Expat in Saudi Arabia",
  description: "Your trusted gateway to property ownership in the Kingdom. Bilingual real estate marketplace for Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <AnimatedBackground />
          <HouseConstruction />
          <BlueprintConnector />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
