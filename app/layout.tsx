import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Lotus Property Group — Real Estate Investment · Chicago",
  description:
    "Lotus Property Group is a Chicago-based real estate investment firm focused on value-add acquisitions and ground-up development. Four projects completed. Five underway.",
  openGraph: {
    title: "Lotus Property Group",
    description:
      "Lotus Property Group is a Chicago-based real estate investment firm focused on value-add acquisitions and ground-up development. Four projects completed. Five underway.",
    url: "https://lotuspropertygroupllc.com",
    siteName: "Lotus Property Group",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Lotus Property Group — Chicago real estate investment firm",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Property Group",
    description:
      "A Chicago-based real estate investment firm focused on value-add acquisitions and ground-up development.",
    images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-canvas text-ink antialiased">
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
