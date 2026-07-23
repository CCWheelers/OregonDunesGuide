import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "Oregon Dunes Field Guide", template: "%s · Oregon Dunes Field Guide" },
  description: "An independent guide to camping, OHV riding, maps, safety, and trip planning in the Oregon Dunes.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Oregon Dunes Field Guide",
    description: "Camp, ride, wander, and plan your Oregon Dunes weekend.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Oregon Dunes Field Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oregon Dunes Field Guide",
    description: "Camp, ride, wander, and plan your Oregon Dunes weekend.",
    images: ["/og.png"],
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
        className={`${geistSans.variable} ${display.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
