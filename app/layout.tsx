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
  metadataBase: new URL("https://oregondunesguide.com"),
  title: { default: "Oregon Dunes Guide", template: "%s | Oregon Dunes Guide" },
  description: "Plan an Oregon Dunes trip with maps, camping, OHV riding zones, weather, tides, safety guidance, nearby towns, and a personalized trip planner.",
  applicationName: "Oregon Dunes Guide",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon-ogd-v2.png", type: "image/png", sizes: "32x32" }],
    shortcut: "/favicon-ogd-v2.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Oregon Dunes Guide",
    description: "Maps, camping, OHV riding, weather, tides, safety, nearby towns, and trip planning for the Oregon Dunes.",
    type: "website",
    siteName: "Oregon Dunes Guide",
    locale: "en_US",
    url: "/",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Oregon Dunes Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oregon Dunes Guide",
    description: "Maps, camping, OHV riding, weather, tides, safety, nearby towns, and trip planning for the Oregon Dunes.",
    images: ["/og/home.jpg"],
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
