import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "3D Text Generator - Create Stunning 3D Typography",
  description: "Create beautiful 3D text with customizable materials (metallic, glass, neon), lighting effects, and export as high-resolution images. Perfect for social media, branding, and design projects.",
  keywords: ["3D text", "text generator", "3D typography", "metallic text", "neon text", "glass effect", "text design"],
  authors: [{ name: "3D Text Generator" }],
  openGraph: {
    title: "3D Text Generator - Create Stunning 3D Typography",
    description: "Create beautiful 3D text with customizable materials, lighting effects, and export as high-resolution images.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Text Generator - Create Stunning 3D Typography",
    description: "Create beautiful 3D text with customizable materials, lighting effects, and export as high-resolution images.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
