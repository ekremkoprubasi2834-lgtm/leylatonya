import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const editorialSerif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Leyla Tonya | Güzelliğin Kişisel İmzası",
  description:
    "Leyla Tonya'nın kişiye özel güzellik yaklaşımını keşfedin ve online randevunuzu oluşturun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${editorialSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
