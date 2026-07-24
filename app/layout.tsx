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
    description: "Interactive maps, camping, riding zones, safety, wildlife, towns, and complete trip planning for the Oregon Dunes.",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1536, height: 1024, alt: "Oregon Dunes Field Guide maps, camp, ride, and explore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oregon Dunes Field Guide",
    description: "Interactive maps, camping, riding zones, safety, wildlife, towns, and complete trip planning for the Oregon Dunes.",
    images: ["/og-v2.png"],
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
