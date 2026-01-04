import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arsitek Studio | Architecture & Engineering",
  description: "Award-winning architecture and engineering firm specializing in modern, sustainable design. Explore our portfolio of residential, commercial, and public projects.",
  keywords: ["architecture", "engineering", "interior design", "landscape", "Indonesia", "modern architecture"],
  authors: [{ name: "Arsitek Studio" }],
  openGraph: {
    title: "Arsitek Studio | Architecture & Engineering",
    description: "Award-winning architecture and engineering firm specializing in modern, sustainable design.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
