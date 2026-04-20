"use client";

import {
    Gamepad2, CircleDot, Crosshair,
    Waves, Glasses, Twitter, Instagram,
    Facebook, Youtube,
} from "lucide-react";
import Link from "next/link";

// ─── Static config ────────────────────────────────────────────────────────────
const LOGO = {
    src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/dnb-logo-white.svg",
    alt: "Dave & Buster's Logo",
};

const SOCIALS = [
    { label: "X (Twitter)", href: "https://x.com/dandb_india/", icon: "twitter" },
    { label: "Instagram", href: "https://www.instagram.com/daveandbustersindia", icon: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/DaveAndBustersIND", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/@DaveAndBustersIndia", icon: "youtube" },
];

// Quick links — static, location-independent
const QUICK_LINKS = [
    { label: "Home", href: (loc) => `/${loc}/` },
    { label: "Contact Us", href: (loc) => `/${loc}/about/contact` },
    { label: "History", href: (loc) => `/${loc}/about/history` },
    { label: "FAQ's", href: (loc) => `/${loc}/about/faq` },
    // Privacy & Terms same for all locations
    { label: "Privacy Policy", href: (loc) => `/${loc}/privacy-policy/` },
    { label: "Terms of Use", href: (loc) => `/${loc}/terms-of-use/` },
];

// Games config — slug must match Strapi page slug
const GAMES_CONFIG = [
    { slug: "arcade", label: "Arcade", icon: "gamepad", path: (loc) => `/${loc}/play/arcade/` },
    { slug: "nitro-bowling", label: "Nitro Bowling", icon: "circle-dot", path: (loc) => `/${loc}/play/nitro-bowling/` },
    { slug: "hi-tech-darts", label: "Hi-Tech Darts", icon: "crosshair", path: (loc) => `/${loc}/play/hi-tech-darts/` },
    { slug: "immersive-pool", label: "Immersive Pool", icon: "waves", path: (loc) => `/${loc}/play/immersive-pool/` },
    { slug: "vr", label: "VR", icon: "glasses", path: (loc) => `/${loc}/play/vr/` },
];

// Page links config — slug must match Strapi page slug
const PAGE_LINKS_CONFIG = [
    { slug: "eat-n-drink", label: "Eat & Drink", path: (loc) => `/${loc}/eat-n-drink/` },
    { slug: "watch", label: "Watch", path: (loc) => `/${loc}/watch/` },
    { slug: "overview", label: "Parties & Events", path: (loc) => `/${loc}/parties/overview/` },
    { slug: "all-offers", label: "Offers", path: (loc) => `/${loc}/offers/all-offer` },
    { slug: "blog", label: "Blogs", path: (loc) => `/${loc}/about/blog` },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SocialIcon({ type }) {
    const cls = "w-5 h-5";
    if (type === "twitter") return <Twitter className={cls} />;
    if (type === "instagram") return <Instagram className={cls} />;
    if (type === "facebook") return <Facebook className={cls} />;
    if (type === "youtube") return <Youtube className={cls} />;
    return null;
}

function GameIcon({ type }) {
    const cls = "w-4 h-4 shrink-0";
    if (type === "gamepad") return <Gamepad2 className={cls} />;
    if (type === "circle-dot") return <CircleDot className={cls} />;
    if (type === "crosshair") return <Crosshair className={cls} />;
    if (type === "waves") return <Waves className={cls} />;
    if (type === "glasses") return <Glasses className={cls} />;
    return null;
}

function FooterHeading({ children }) {
    return (
        <p className="text-white text-lg font-semibold mb-4 relative after:absolute after:left-0 after:-bottom-1.5 after:w-8 after:h-0.5 after:bg-amber-400 after:rounded-full">
            {children}
        </p>
    );
}

// ─── Footer Component ─────────────────────────────────────────────────────────
// Props:
//   locationSlug — e.g. "bangalore"
//   pages        — from getPagesByLocation() — array of { slug, title }
//   locationData — from getLocationBySlug() — has address field
export default function Footer({ locationSlug = "bangalore", pages = [], locationData = null }) {
    const availableSlugs = new Set(pages.map((p) => p.slug));

    // Address from Strapi location, fallback to static
    const address = locationData?.address ||
        "1st Floor, Mantri Avenue, KHB Games Village, Koramangala, Bangalore, Karnataka 560047";

    // Filter games by available pages for this location
    const games = GAMES_CONFIG.filter((g) => availableSlugs.has(g.slug));

    // Filter page links by available pages
    const pageLinks = PAGE_LINKS_CONFIG.filter((p) => availableSlugs.has(p.slug));

    return (
        <footer
            className="text-white pt-12 pb-4"
            style={{ background: "linear-gradient(to bottom, #15189a, #22d8ff)" }}
        >
            <div className="max-w-screen-xl mx-auto px-6">

                {/* ── Main grid ─────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <Link href={`/${locationSlug}/`} className="inline-block mb-5">
                            <img src={LOGO.src} alt={LOGO.alt} className="h-12 w-auto" />
                        </Link>

                        {/* Address — from Strapi location */}
                        <p className="text-sm leading-relaxed text-white/90 mb-6 max-w-xs">
                            {address}
                        </p>

                        {/* Social icons */}
                        <ul className="flex items-center gap-[15px]">
                            {SOCIALS.map((s) => (
                                <li key={s.label}>
                                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="flex items-center justify-center rounded-full text-black bg-white transition-opacity hover:opacity-80"
                                        style={{ width: 45, height: 45, padding: 10, boxSizing: "border-box" }}>
                                        <SocialIcon type={s.icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links — static with dynamic location slug */}
                    <div>
                        <FooterHeading>Quick Links</FooterHeading>
                        <ul className="space-y-2.5">
                            {QUICK_LINKS.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href(locationSlug)}
                                        className="text-sm text-white/90 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Games — filtered by Strapi pages */}
                    <div>
                        <FooterHeading>Games</FooterHeading>
                        <ul className="space-y-2.5">
                            {games.length > 0 ? games.map((item) => (
                                <li key={item.slug}>
                                    <Link href={item.path(locationSlug)}
                                        className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors">
                                        <GameIcon type={item.icon} />
                                        {item.label}
                                    </Link>
                                </li>
                            )) : GAMES_CONFIG.map((item) => (
                                // Fallback — show all if no pages from Strapi yet
                                <li key={item.slug}>
                                    <Link href={item.path(locationSlug)}
                                        className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors">
                                        <GameIcon type={item.icon} />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Page Links — filtered by Strapi pages */}
                    <div>
                        <FooterHeading>Page Links</FooterHeading>
                        <ul className="space-y-2.5">
                            {pageLinks.length > 0 ? pageLinks.map((item) => (
                                <li key={item.slug}>
                                    <Link href={item.path(locationSlug)}
                                        className="text-sm text-white/90 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            )) : PAGE_LINKS_CONFIG.map((item) => (
                                // Fallback — show all if no pages from Strapi yet
                                <li key={item.slug}>
                                    <Link href={item.path(locationSlug)}
                                        className="text-sm text-white/90 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Divider + copyright ───────────────────────────────── */}
                <div className="border-t border-white/20 pt-4">
                    <p className="text-center text-xs text-white/80">
                        © 2026 Malpani Arcade Private Limited
                    </p>
                </div>
            </div>
        </footer>
    );
}