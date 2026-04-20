import { Libre_Franklin } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-libre",
  display: "swap",
});

const dinBuster = localFont({
  src: "../../public/fonts/DINBuster.woff2",
  variable: "--font-din",
  display: "swap",
  weight: "400 700",
});

export const metadata = {
  title: "Dave & Buster's India",
  description: "Eat, Drink, Play & Watch at Dave & Buster's India. Book tables, games, and more.",
  keywords: "Dave and Busters, arcade, VR, bowling, darts, Bangalore, Mumbai",
  openGraph: {
    title: "Dave & Buster's India",
    description: "Eat, Drink, Play & Watch at Dave & Buster's India.",
    url: "https://daveandbustersindia.com",
    siteName: "Dave & Buster's India",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${dinBuster.variable}`}>
      <body
        className="min-h-screen bg-white antialiased"
        style={{ fontFamily: "var(--font-libre), 'Libre Franklin', sans-serif" }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}