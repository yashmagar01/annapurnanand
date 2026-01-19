import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Annapurnanand | Pure Plant-Based Nutrition from Godavari Riverbelt",
    template: "%s | Annapurnanand HerbalGold",
  },
  description:
    "Farmer-grown, science-backed Moringa products from the Godavari Riverbelt. Formulated by Dr. Mohini Zate (BAMS, MPH-N). Premium Ayurvedic nutrition for the whole family.",
  keywords: [
    "Riverbelt Moringa",
    "Doctor formulated herbal",
    "FPC organic products",
    "Ayurvedic nutrition",
    "Moringa powder",
    "Plant-based nutrition India",
    "Dr. Mohini Zate",
    "Godavari herbal products",
  ],
  authors: [{ name: "Dr. Mohini Zate" }],
  creator: "Annapurnanand HerbalGold",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://annapurnanand.com",
    siteName: "Annapurnanand HerbalGold",
    title: "Pure Plant-Based Nutrition from Godavari Riverbelt",
    description:
      "Farmer-grown, science-backed Moringa products formulated by Dr. Mohini Zate.",
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
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
