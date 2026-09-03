import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tzaneen-chamber-of-commerce.vercel.app"),
  title: {
    default: "Tzaneen Chamber of Commerce",
    template: "%s | Tzaneen Chamber of Commerce",
  },
  description:
    "We are a dynamic business association that supports local businesses and their role in the economic prosperity of Greater Tzaneen, through advocacy, networking, representation and information sharing.",
  openGraph: {
    title: "Tzaneen Chamber of Commerce",
    description:
      "Advocacy, networking and representation for the businesses driving Greater Tzaneen's economy forward.",
    url: "https://tzaneen-chamber-of-commerce.vercel.app",
    siteName: "Tzaneen Chamber of Commerce",
    images: ["/images/hero-tzaneen.jpg"],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tzaneen Chamber of Commerce",
    description:
      "Advocacy, networking and representation for the businesses driving Greater Tzaneen's economy forward.",
    images: ["/images/hero-tzaneen.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
