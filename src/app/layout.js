import { Libre_Franklin } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer";

// ─── --primary-font: "Libre Franklin" ────────────────────────────────────────
const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-libre",
  display: "swap",
});

// ─── --alt-font: 'DINBuster' (self-hosted) ───────────────────────────────────
// File location: public/fonts/DINBuster.woff2
const dinBuster = localFont({
  src: "../../public/fonts/DINBuster.woff2",
  variable: "--font-din",
  display: "swap",
  weight: "400 700", // covers regular and bold weights
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

async function getCity() {
  return "Bangalore";
}

export default async function RootLayout({ children }) {
  const city = await getCity();

  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} ${dinBuster.variable}`}
    >
      <body
        className="min-h-screen bg-white antialiased"
        style={{ fontFamily: "var(--font-libre), 'Libre Franklin', sans-serif" }}
      >
        <Header city={city} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}